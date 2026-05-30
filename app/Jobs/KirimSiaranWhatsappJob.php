<?php

namespace App\Jobs;

use App\Services\Waha\WahaService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class KirimSiaranWhatsappJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 2;

    public int $timeout = 60;

    public function __construct(
        public readonly string $phone,
        public readonly string $text,
    ) {}

    public function handle(WahaService $waha): void
    {
        $waha->sendHuman($this->phone, $this->text);
    }
}
