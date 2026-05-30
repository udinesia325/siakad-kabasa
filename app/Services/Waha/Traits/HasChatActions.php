<?php

namespace App\Services\Waha\Traits;

use App\Services\Waha\Exceptions\WahaRequestException;
use Illuminate\Http\Client\ConnectionException;

trait HasChatActions
{
    public function sendText(string $chatId, string $text): array
    {
        return $this->postJson('/api/sendText', [
            'chatId' => $chatId,
            'text' => $text,
            'session' => $this->session,
        ]);
    }

    public function sendImage(string $chatId, string $url, ?string $caption = null): array
    {
        $payload = [
            'chatId' => $chatId,
            'file' => ['url' => $url],
            'session' => $this->session,
        ];

        if ($caption !== null) {
            $payload['caption'] = $caption;
        }

        return $this->postJson('/api/sendImage', $payload);
    }

    public function sendFile(string $chatId, string $url, string $filename): array
    {
        return $this->postJson('/api/sendFile', [
            'chatId' => $chatId,
            'file' => ['url' => $url, 'filename' => $filename],
            'session' => $this->session,
        ]);
    }

    /**
     * Set global presence (online/offline) — tanpa chatId.
     * Untuk typing/recording/paused per chat, gunakan setTyping().
     */
    public function setPresence(string $presence): void
    {
        $this->postVoid("/api/{$this->session}/presence", [
            'presence' => $presence,
        ]);
    }

    public function setTyping(string $chatId, bool $typing): void
    {
        $endpoint = $typing ? '/api/startTyping' : '/api/stopTyping';
        $this->postVoid($endpoint, [
            'chatId' => $chatId,
            'session' => $this->session,
        ]);
    }

    public function sendSeen(string $chatId, string $messageId): void
    {
        $this->postVoid('/api/sendSeen', [
            'chatId' => $chatId,
            'messageId' => $messageId,
            'session' => $this->session,
        ]);
    }

    private function postJson(string $endpoint, array $payload): array
    {
        try {
            $response = $this->http()->post($endpoint, $payload);
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }

        return $response->json();
    }
}
