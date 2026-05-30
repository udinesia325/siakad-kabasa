<?php

namespace Database\Seeders;

use App\Models\WhatsappTemplate;
use Illuminate\Database\Seeder;

class WhatsappTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $templates = [
            [
                'nama' => 'Siaran Alpha',
                'variabel' => 'nama_siswa,nama_kelas,tanggal',
                'text' => "Assalamu'alaikum Wr. Wb.\n\nYth. Orang Tua/Wali dari *{{nama_siswa}}*\n\nKami informasikan bahwa putra/putri Bapak/Ibu *tidak hadir* di sekolah pada:\n\n📅 *Tanggal:* {{tanggal}}\n🏫 *Kelas:* {{nama_kelas}}\n\nMohon konfirmasi ketidakhadiran tersebut kepada pihak sekolah.\n\nTerima kasih atas perhatian Bapak/Ibu.\n\n_Hormat kami,_\n_Tata Usaha Sekolah_",
            ],
            [
                'nama' => 'Siaran Terlambat',
                'variabel' => 'nama_siswa,nama_kelas,jam_masuk,tanggal',
                'text' => "Assalamu'alaikum Wr. Wb.\n\nYth. Orang Tua/Wali dari *{{nama_siswa}}*\n\nKami informasikan bahwa putra/putri Bapak/Ibu *terlambat* masuk sekolah pada:\n\n📅 *Tanggal:* {{tanggal}}\n🕐 *Jam Masuk:* {{jam_masuk}}\n🏫 *Kelas:* {{nama_kelas}}\n\nMohon untuk memperhatikan kedisiplinan waktu putra/putri Bapak/Ibu.\n\nTerima kasih atas perhatian Bapak/Ibu.\n\n_Hormat kami,_\n_Tata Usaha Sekolah_",
            ],
        ];

        foreach ($templates as $template) {
            WhatsappTemplate::firstOrCreate(
                ['nama' => $template['nama']],
                $template,
            );
        }
    }
}
