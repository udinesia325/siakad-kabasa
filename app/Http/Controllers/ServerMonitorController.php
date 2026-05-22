<?php

namespace App\Http\Controllers;

use App\Services\PulseDataService;
use App\Services\SystemInfoService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServerMonitorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('sistem/server-monitor/index');
    }

    public function stats(SystemInfoService $sys, PulseDataService $pulse): JsonResponse
    {
        return response()->json([
            'system' => $sys->collect(),
            'pulse' => $pulse->collect(),
        ]);
    }
}
