<?php

namespace App\Services\Waha\Traits;

use App\Services\Waha\Exceptions\WahaRequestException;
use App\Services\Waha\Exceptions\WahaSessionException;
use Illuminate\Http\Client\ConnectionException;

trait HasSessionManagement
{
    public function getQrCode(): string
    {
        try {
            $response = $this->http()
                ->withHeader('Accept', 'image/png')
                ->get("/api/{$this->session}/auth/qr", ['format' => 'image']);
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        $this->devLog('GET', "/api/{$this->session}/auth/qr", $response->status(), "content-type={$response->header('Content-Type')} bytes=" . strlen($response->body()));

        if ($response->status() === 404) {
            throw WahaSessionException::notFound($this->session);
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }

        return $response->body();
    }

    public function me(): array
    {
        try {
            $response = $this->http()->get("/api/sessions/{$this->session}/me");
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        $this->devLog('GET', "/api/sessions/{$this->session}/me", $response->status(), $response->body());

        if ($response->status() === 404) {
            throw WahaSessionException::notFound($this->session);
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }

        return $response->json();
    }

    public function getSessionStatus(): array
    {
        try {
            $response = $this->http()->get("/api/sessions/{$this->session}");
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        $this->devLog('GET', "/api/sessions/{$this->session}", $response->status(), $response->body());

        if ($response->status() === 404) {
            throw WahaSessionException::notFound($this->session);
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }

        return $response->json();
    }

    public function getProfile(): array
    {
        try {
            $response = $this->http()->get("/api/{$this->session}/profile");
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        $this->devLog('GET', "/api/{$this->session}/profile", $response->status(), $response->body());

        if ($response->status() === 404) {
            throw WahaSessionException::notFound($this->session);
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }

        return $response->json();
    }

    private function devLog(string $method, string $endpoint, int $status, string $body): void
    {
        if (app()->isProduction()) {
            return;
        }

        $preview = strlen($body) > 200 ? substr($body, 0, 200) . '…' : $body;
        logger()->debug("[WAHA] {$method} {$endpoint} → {$status}", ['body' => $preview]);
    }

    public function restart(): void
    {
        $this->postVoid("/api/sessions/{$this->session}/restart");
    }

    public function stop(): void
    {
        $this->postVoid("/api/sessions/{$this->session}/stop");
    }

    public function logout(): void
    {
        $this->postVoid("/api/sessions/{$this->session}/logout");
    }

    public function reconnect(): void
    {
        // WAHA tidak punya endpoint reconnect — restart adalah ekuivalen terdekat
        $this->postVoid("/api/sessions/{$this->session}/restart");
    }

    protected function postVoid(string $endpoint, array $payload = []): void
    {
        try {
            $response = $this->http()->post($endpoint, $payload);
        } catch (ConnectionException $e) {
            $this->devLog('POST', $endpoint, 0, "CONNECTION FAILED — {$e->getMessage()}");
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        $this->devLog('POST', $endpoint, $response->status(), $response->body());

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }
    }
}
