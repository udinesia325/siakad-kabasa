<?php

namespace App\Http\Controllers;

use App\Services\PulseDataService;
use App\Services\SystemInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ServerMonitorController extends Controller
{
    // TTL cache 5 detik — cukup fresh untuk monitor, tapi tidak menyebabkan
    // shell commands (top -l 2, usleep) dipanggil tiap request polling 2s.
    private const CACHE_TTL = 10;

    public function index(): Response
    {
        return Inertia::render('sistem/server-monitor/index');
    }

    public function stats(SystemInfoService $sys, PulseDataService $pulse): JsonResponse
    {
        $data = Cache::remember('server-monitor:stats', self::CACHE_TTL, fn () => [
            'system' => $sys->collect(),
            'pulse' => $pulse->collect(),
        ]);

        return response()->json($data);
    }
}
