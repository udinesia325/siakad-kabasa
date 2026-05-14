<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $now = now();
        DB::table('m_siswa')
            ->whereNotNull('kelas_id')
            ->orderBy('id')
            ->chunkById(500, function ($siswas) use ($now) {
                $rows = [];
                foreach ($siswas as $siswa) {
                    $rows[] = [
                        'siswa_id' => $siswa->id,
                        'kelas_id' => $siswa->kelas_id,
                        'mulai' => ($siswa->created_at ?? $now),
                        'selesai' => null,
                        'alasan' => 'pendaftaran',
                        'keterangan' => null,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }
                if ($rows) {
                    DB::table('t_kelas_siswa')->insert($rows);
                }
            });
    }

    public function down(): void
    {
        DB::table('t_kelas_siswa')->where('alasan', 'pendaftaran')->delete();
    }
};
