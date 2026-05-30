<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $templates = [
            [
                'nama' => 'Siaran Alpha',
                'variabel' => 'nama_siswa,nama_kelas,tanggal',
                'text' => "Assalamu'alaikum Wr. Wb.\n\nYth. Orang Tua/Wali dari *{{nama_siswa}}*\n\nKami informasikan bahwa putra/putri Bapak/Ibu tercatat tidak hadir (Alpha) di sekolah pada:\n\n📅 Tanggal: *{{tanggal}}*\n🏫 Kelas: *{{nama_kelas}}*\n\nDemikian informasi yang dapat kami sampaikan.\n\nTerima kasih atas perhatian Bapak/Ibu.\n\nHormat kami,\nTata Usaha Sekolah",
            ],
            [
                'nama' => 'Siaran Terlambat',
                'variabel' => 'nama_siswa,nama_kelas,jam_masuk,tanggal',
                'text' => "Assalamu'alaikum Wr. Wb.\n\nYth. Orang Tua/Wali dari *{{nama_siswa}}*\n\nKami informasikan bahwa putra/putri Bapak/Ibu tercatat terlambat masuk sekolah pada:\n\n📅 Tanggal: *{{tanggal}}*\n🕐 Jam Masuk: *{{jam_masuk}}*\n🏫 Kelas: *{{nama_kelas}}*\n\nDemikian informasi yang dapat kami sampaikan.\n\nTerima kasih atas perhatian Bapak/Ibu.\n\nHormat kami,\nTata Usaha Sekolah",
            ],
        ];

        foreach ($templates as $template) {
            DB::table('m_whatsapp_template')->updateOrInsert(
                ['nama' => $template['nama']],
                array_merge($template, ['updated_at' => now(), 'created_at' => now()]),
            );
        }
    }

    public function down(): void
    {
        DB::table('m_whatsapp_template')
            ->whereIn('nama', ['Siaran Alpha', 'Siaran Terlambat'])
            ->delete();
    }
};
