<?php

namespace Tests\Unit\Services\Waha;

use App\Services\Waha\Exceptions\WahaRequestException;
use App\Services\Waha\Exceptions\WahaSessionException;
use App\Services\Waha\WahaService;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class WahaSessionTest extends TestCase
{
    private WahaService $waha;

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

    public function test_getQrCode_returns_base64_string(): void
    {
        Http::fake([
            'localhost:3000/api/default/auth/qr*' => Http::response(
                ['mimetype' => 'image/png', 'data' => 'abc123=='],
                200
            ),
        ]);

        $result = $this->waha->getQrCode();

        $this->assertSame('abc123==', $result);
    }

    public function test_getQrCode_throws_session_exception_on_404(): void
    {
        Http::fake([
            'localhost:3000/api/default/auth/qr*' => Http::response([], 404),
        ]);

        $this->expectException(WahaSessionException::class);
        $this->waha->getQrCode();
    }

    public function test_me_returns_account_info(): void
    {
        Http::fake([
            'localhost:3000/api/default/auth/me' => Http::response(
                ['id' => '6281234567890@c.us', 'pushName' => 'Test'],
                200
            ),
        ]);

        $result = $this->waha->me();

        $this->assertSame('6281234567890@c.us', $result['id']);
    }

    public function test_restart_succeeds(): void
    {
        Http::fake([
            'localhost:3000/api/default/restart' => Http::response([], 200),
        ]);

        $this->waha->restart();

        Http::assertSent(fn (Request $req) => $req->url() === 'http://localhost:3000/api/default/restart'
            && $req->method() === 'POST'
        );
    }

    public function test_restart_throws_request_exception_on_error(): void
    {
        Http::fake([
            'localhost:3000/api/default/restart' => Http::response(['error' => 'fail'], 500),
        ]);

        $this->expectException(WahaRequestException::class);
        $this->waha->restart();
    }

    public function test_stop_sends_correct_request(): void
    {
        Http::fake([
            'localhost:3000/api/default/stop' => Http::response([], 200),
        ]);

        $this->waha->stop();

        Http::assertSent(fn (Request $req) => str_contains($req->url(), '/api/default/stop'));
    }

    public function test_logout_sends_correct_request(): void
    {
        Http::fake([
            'localhost:3000/api/default/logout' => Http::response([], 200),
        ]);

        $this->waha->logout();

        Http::assertSent(fn (Request $req) => str_contains($req->url(), '/api/default/logout'));
    }

    public function test_reconnect_sends_correct_request(): void
    {
        Http::fake([
            'localhost:3000/api/default/reconnect' => Http::response([], 200),
        ]);

        $this->waha->reconnect();

        Http::assertSent(fn (Request $req) => str_contains($req->url(), '/api/default/reconnect'));
    }
}
