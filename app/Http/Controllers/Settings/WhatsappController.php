<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Services\Waha\Exceptions\WahaRequestException;
use App\Services\Waha\Exceptions\WahaSessionException;
use App\Services\Waha\WahaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WhatsappController extends Controller
{
    public function __construct(private readonly WahaService $waha) {}

    public function index(): InertiaResponse
    {
        $waState = 'error';
        $profile = null;
        $sessionInfo = null;
        $errorMessage = null;

        try {
            $sessionInfo = $this->waha->getSessionStatus();
            $status = $sessionInfo['status'] ?? 'STOPPED';

            if ($status === 'WORKING') {
                $waState = 'connected';
                try {
                    $raw = $this->waha->getProfile();
                    // WAHA /auth/me returns: { id: "628...@c.us", name: "...", picture: "..." }
                    // Extract number from id (strip @c.us suffix)
                    $rawId = $raw['id'] ?? null;
                    $number = $rawId ? preg_replace('/@.*$/', '', $rawId) : null;
                    $profile = [
                        'id'       => $rawId,
                        'pushname' => $raw['pushName'] ?? $raw['pushname'] ?? $raw['name'] ?? null,
                        'number'   => $raw['number'] ?? $number,
                    ];
                } catch (\Throwable) {
                    // profile gagal tidak fatal — tetap tampilkan halaman
                }
            } else {
                $waState = 'disconnected';
            }
        } catch (WahaSessionException $e) {
            $waState = 'disconnected';
            $errorMessage = $e->getMessage();
        } catch (WahaRequestException $e) {
            $waState = 'error';
            $errorMessage = 'Tidak dapat terhubung ke WAHA server: ' . $e->getMessage();
        }

        return Inertia::render('settings/whatsapp', [
            'waState' => $waState,
            'profile' => $profile,
            'sessionInfo' => $sessionInfo,
            'errorMessage' => $errorMessage,
        ]);
    }

    public function restart(): RedirectResponse
    {
        try {
            $this->waha->restart();
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Sesi WhatsApp berhasil di-restart.']);
        } catch (\Throwable $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Gagal restart: ' . $e->getMessage()]);
        }

        return redirect()->route('settings.whatsapp');
    }

    public function stop(): RedirectResponse
    {
        try {
            $this->waha->stop();
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Sesi WhatsApp berhasil dihentikan.']);
        } catch (\Throwable $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Gagal stop: ' . $e->getMessage()]);
        }

        return redirect()->route('settings.whatsapp');
    }

    public function logout(): RedirectResponse
    {
        try {
            $this->waha->logout();
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Logout WhatsApp berhasil.']);
        } catch (\Throwable $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Gagal logout: ' . $e->getMessage()]);
        }

        return redirect()->route('settings.whatsapp');
    }

    public function reconnect(): RedirectResponse
    {
        try {
            $this->waha->reconnect();
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Reconnect WhatsApp berhasil.']);
        } catch (\Throwable $e) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Gagal reconnect: ' . $e->getMessage()]);
        }

        return redirect()->route('settings.whatsapp');
    }

    public function qr(): Response
    {
        try {
            $imageData = $this->waha->getQrCode();

            if (str_starts_with($imageData, 'data:image')) {
                $base64 = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
                $binary = base64_decode($base64);
            } else {
                $binary = $imageData;
            }

            return response($binary, 200, ['Content-Type' => 'image/png']);
        } catch (\Throwable) {
            $pixel = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
            return response($pixel, 200, ['Content-Type' => 'image/png']);
        }
    }
}
