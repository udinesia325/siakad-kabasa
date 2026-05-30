<?php

namespace App\Services\Waha;

use App\Services\Waha\Traits\HasChatActions;
use App\Services\Waha\Traits\HasSessionManagement;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class WahaService
{
    use HasChatActions, HasSessionManagement;

    // Kecepatan mengetik rata-rata manusia: ~40 WPM, asumsi 5 karakter/kata
    private const AVG_MS_PER_CHAR = 30;

    // Batas atas typing indicator agar tidak mencurigakan
    private const MAX_TYPING_MS = 8_000;

    protected string $session;

    private string $baseUrl;

    private string $apiKey;

    public function __construct()
    {
        $this->session = config('services.waha.session_name');
        $this->baseUrl = config('services.waha.base_url');
        $this->apiKey = config('services.waha.api_key');
    }

    /**
     * Kirim pesan teks dengan simulasi perilaku manusia:
     * online → typing (durasi proporsional panjang teks) → kirim → offline.
     *
     * Cocok dijalankan di dalam queue job agar tidak memblokir request.
     */
    public function sendHuman(string $phone, string $text): array
    {
        $chatId = $this->normalizeChatId($phone);

        // 1. Tampak online (global — tanpa chatId)
        $this->setPresence('online');

        // 2. Jeda singkat acak — simulasi "baru buka percakapan" (300–800ms)
        usleep(random_int(300_000, 800_000));

        // 3. Mulai mengetik (per chat — butuh chatId)
        $this->setTyping($chatId, true);

        // 4. Durasi typing: proporsional panjang teks + jitter ±20%, maks 8 detik
        $baseMs = strlen($text) * self::AVG_MS_PER_CHAR;
        $jitter = (int) ($baseMs * (random_int(-20, 20) / 100));
        $typingMs = min($baseMs + $jitter, self::MAX_TYPING_MS);
        usleep(max($typingMs, 500) * 1_000);

        // 5. Selesai mengetik
        $this->setTyping($chatId, false);

        // 6. Jeda review singkat sebelum kirim (100–300ms)
        usleep(random_int(100_000, 300_000));

        // 7. Kirim pesan
        $result = $this->sendText($chatId, $text);

        // 8. Kembali offline (global)
        $this->setPresence('offline');

        return $result;
    }

    /**
     * Normalisasi nomor telepon ke format chatId WAHA (628xxx@c.us).
     * Menerima format: 08xxx, +628xxx, 628xxx.
     */
    public function normalizeChatId(string $phone): string
    {
        // Hapus semua non-digit
        $digits = preg_replace('/\D/', '', $phone);

        // Ubah awalan 0 → 62
        if (str_starts_with($digits, '0')) {
            $digits = '62' . substr($digits, 1);
        }

        return $digits . '@c.us';
    }

    protected function http(): PendingRequest
    {
        return Http::baseUrl($this->baseUrl)
            ->withHeader('X-Api-Key', $this->apiKey)
            ->timeout(15)
            ->acceptJson();
    }
}
