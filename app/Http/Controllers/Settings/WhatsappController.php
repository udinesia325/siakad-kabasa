<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Services\Waha\Exceptions\WahaRequestException;
use App\Services\Waha\Exceptions\WahaSessionException;
use App\Services\Waha\WahaService;
use Illuminate\Http\JsonResponse;
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
                    // WAHA /profile returns: { id: "628...@c.us", name: "...", picture: "url|null" }
                    // Extract number from id (strip @c.us suffix)
                    $rawId = $raw['id'] ?? null;
                    $number = $rawId ? preg_replace('/@.*$/', '', $rawId) : null;
                    $profile = [
                        'id'      => $rawId,
                        'name'    => $raw['name'] ?? $raw['pushName'] ?? null,
                        'number'  => $raw['number'] ?? $number,
                        'picture' => $raw['picture'] ?? null,
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

    /**
     * Lightweight JSON endpoint for frontend polling.
     * Returns the raw WAHA status string so the frontend can drive its state machine.
     */
    public function status(): JsonResponse
    {
        try {
            $info = $this->waha->getSessionStatus();
            $wahaStatus = $info['status'] ?? 'STOPPED';
        } catch (WahaSessionException) {
            $wahaStatus = 'STOPPED';
        } catch (WahaRequestException) {
            $wahaStatus = 'ERROR';
        }

        // Map WAHA raw status → frontend session state
        // WAHA: STOPPED | STARTING | SCAN_QR_CODE | WORKING | FAILED
        $sessionState = match ($wahaStatus) {
            'WORKING'      => 'logged_in',
            'STARTING'     => 'logging_in',
            'SCAN_QR_CODE' => 'logged_out',   // needs QR scan = effectively logged out
            'STOPPED', 'FAILED' => 'logged_out',
            default        => 'error',
        };

        return response()->json([
            'sessionState' => $sessionState,
            'wahaStatus'   => $wahaStatus,
        ]);
    }

    public function restart(): JsonResponse
    {
        try {
            $this->waha->restart();

            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function stop(): JsonResponse
    {
        try {
            $this->waha->stop();

            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function logout(): JsonResponse
    {
        try {
            $this->waha->logout();

            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function reconnect(): JsonResponse
    {
        try {
            $this->waha->reconnect();

            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function qr(): Response
    {
        try {
            $binary = $this->waha->getQrCode();

            return response($binary, 200, ['Content-Type' => 'image/png']);
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('WAHA qr() failed', ['error' => $e->getMessage()]);

            return response('', 503);
        }
    }
}
