<?php

namespace Tests\Unit\Services\Waha;

use App\Services\Waha\Exceptions\WahaRequestException;
use App\Services\Waha\WahaService;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class WahaChatTest extends TestCase
{
    private WahaService $waha;

    private string $chatId = '6281234567890@c.us';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'services.waha.base_url'     => 'http://localhost:3000',
            'services.waha.api_key'      => 'test-key',
            'services.waha.session_name' => 'default',
        ]);
        $this->waha = new WahaService();
    }

    public function test_sendText_sends_correct_payload(): void
    {
        Http::fake([
            'localhost:3000/api/sendText' => Http::response(['id' => 'msg-1'], 200),
        ]);

        $result = $this->waha->sendText($this->chatId, 'Halo dunia');

        $this->assertSame('msg-1', $result['id']);
        Http::assertSent(function (Request $req) {
            $body = $req->data();
            return $req->url() === 'http://localhost:3000/api/sendText'
                && $body['chatId'] === $this->chatId
                && $body['text'] === 'Halo dunia'
                && $body['session'] === 'default';
        });
    }

    public function test_sendText_throws_on_error(): void
    {
        Http::fake([
            'localhost:3000/api/sendText' => Http::response([], 500),
        ]);

        $this->expectException(WahaRequestException::class);
        $this->waha->sendText($this->chatId, 'test');
    }

    public function test_sendImage_sends_correct_payload(): void
    {
        Http::fake([
            'localhost:3000/api/sendImage' => Http::response(['id' => 'img-1'], 200),
        ]);

        $result = $this->waha->sendImage($this->chatId, 'https://example.com/img.jpg', 'caption');

        $this->assertSame('img-1', $result['id']);
        Http::assertSent(function (Request $req) {
            $body = $req->data();
            return $body['chatId'] === $this->chatId
                && $body['file']['url'] === 'https://example.com/img.jpg'
                && $body['caption'] === 'caption';
        });
    }

    public function test_sendImage_without_caption(): void
    {
        Http::fake([
            'localhost:3000/api/sendImage' => Http::response(['id' => 'img-2'], 200),
        ]);

        $result = $this->waha->sendImage($this->chatId, 'https://example.com/img.jpg');

        $this->assertSame('img-2', $result['id']);
    }

    public function test_sendFile_sends_correct_payload(): void
    {
        Http::fake([
            'localhost:3000/api/sendFile' => Http::response(['id' => 'file-1'], 200),
        ]);

        $result = $this->waha->sendFile($this->chatId, 'https://example.com/doc.pdf', 'laporan.pdf');

        $this->assertSame('file-1', $result['id']);
        Http::assertSent(function (Request $req) {
            $body = $req->data();
            return $body['file']['url'] === 'https://example.com/doc.pdf'
                && $body['file']['filename'] === 'laporan.pdf';
        });
    }

    public function test_setPresence_sends_correct_payload(): void
    {
        Http::fake([
            'localhost:3000/api/default/presence' => Http::response([], 200),
        ]);

        $this->waha->setPresence($this->chatId, 'online');

        Http::assertSent(function (Request $req) {
            $body = $req->data();
            return str_contains($req->url(), '/api/default/presence')
                && $body['chatId'] === $this->chatId
                && $body['presence'] === 'online';
        });
    }

    public function test_setTyping_true_calls_startTyping(): void
    {
        Http::fake([
            'localhost:3000/api/startTyping' => Http::response([], 200),
        ]);

        $this->waha->setTyping($this->chatId, true);

        Http::assertSent(fn (Request $req) => str_contains($req->url(), '/api/startTyping'));
    }

    public function test_setTyping_false_calls_stopTyping(): void
    {
        Http::fake([
            'localhost:3000/api/stopTyping' => Http::response([], 200),
        ]);

        $this->waha->setTyping($this->chatId, false);

        Http::assertSent(fn (Request $req) => str_contains($req->url(), '/api/stopTyping'));
    }

    public function test_sendSeen_sends_correct_payload(): void
    {
        Http::fake([
            'localhost:3000/api/sendSeen' => Http::response([], 200),
        ]);

        $this->waha->sendSeen($this->chatId, 'true_6281234567890@c.us_msg-999');

        Http::assertSent(function (Request $req) {
            $body = $req->data();
            return str_contains($req->url(), '/api/sendSeen')
                && $body['chatId'] === $this->chatId
                && $body['messageId'] === 'true_6281234567890@c.us_msg-999';
        });
    }
}
