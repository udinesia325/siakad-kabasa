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
            $response = $this->http()->get("/api/{$this->session}/auth/qr", ['format' => 'image']);
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        if ($response->status() === 404) {
            throw WahaSessionException::notFound($this->session);
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }

        return $response->json('data') ?? $response->body();
    }

    public function me(): array
    {
        try {
            $response = $this->http()->get("/api/{$this->session}/auth/me");
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

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
        return $this->me();
    }

    public function restart(): void
    {
        $this->postVoid("/api/{$this->session}/restart");
    }

    public function stop(): void
    {
        $this->postVoid("/api/{$this->session}/stop");
    }

    public function logout(): void
    {
        $this->postVoid("/api/{$this->session}/logout");
    }

    public function reconnect(): void
    {
        $this->postVoid("/api/{$this->session}/reconnect");
    }

    protected function postVoid(string $endpoint, array $payload = []): void
    {
        try {
            $response = $this->http()->post($endpoint, $payload);
        } catch (ConnectionException $e) {
            throw WahaRequestException::connectionFailed($e->getMessage());
        }

        if (! $response->successful()) {
            throw WahaRequestException::fromResponse($response->status(), $response->body());
        }
    }
}
