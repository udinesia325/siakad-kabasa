<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

#[Fillable(['hari', 'berlaku_mulai', 'is_libur', 'jam_masuk_min', 'jam_masuk_max', 'jam_pulang_min', 'jam_pulang_max', 'dibuat_oleh'])]
class JadwalAbsensiLog extends Model
{
    protected $table = 'm_jadwal_absensi_log';

    protected function casts(): array
    {
        return [
            'berlaku_mulai' => 'date',
            'is_libur' => 'boolean',
            'jam_masuk_min' => 'datetime:H:i',
            'jam_masuk_max' => 'datetime:H:i',
            'jam_pulang_min' => 'datetime:H:i',
            'jam_pulang_max' => 'datetime:H:i',
        ];
    }

    /**
     * Preload semua log yang relevan untuk rentang tanggal.
     * Mengambil semua record dengan berlaku_mulai <= $sampai,
     * diurutkan desc agar first() selalu dapat yang terbaru.
     */
    public static function preloadUntukRentang(Carbon $sampai): Collection
    {
        return static::where('berlaku_mulai', '<=', $sampai->toDateString())
            ->orderBy('hari')
            ->orderByDesc('berlaku_mulai')
            ->get();
    }

    /**
     * Resolve jadwal yang berlaku pada tanggal tertentu dari koleksi preloaded.
     * Koleksi harus sudah diurutkan orderByDesc('berlaku_mulai').
     */
    public static function resolveUntukTanggal(Collection $logs, Carbon $tanggal): ?self
    {
        $hari = $tanggal->isoWeekday();
        $tglStr = $tanggal->toDateString();

        return $logs
            ->where('hari', $hari)
            ->first(fn ($log) => $log->berlaku_mulai->toDateString() <= $tglStr);
    }

    /**
     * Resolve jadwal untuk hari ini langsung dari DB (untuk scanner RFID).
     */
    public static function untukHariIni(): ?self
    {
        $hari = (int) Carbon::now()->isoWeekday();
        $today = Carbon::today()->toDateString();

        return static::where('hari', $hari)
            ->where('berlaku_mulai', '<=', $today)
            ->orderByDesc('berlaku_mulai')
            ->first();
    }
}
