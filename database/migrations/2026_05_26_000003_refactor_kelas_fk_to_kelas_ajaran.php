<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Add new columns (nullable for backfill)
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_id')->nullable()->after('kelas_id')
                ->constrained('t_kelas_ajaran')->nullOnDelete();
        });

        Schema::table('t_kelas_siswa', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_id')->nullable()->after('kelas_id')
                ->constrained('t_kelas_ajaran')->restrictOnDelete();
        });

        Schema::table('t_jadwal_mengajar', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_id')->nullable()->after('kelas_id')
                ->constrained('t_kelas_ajaran')->cascadeOnDelete();
        });

        Schema::table('t_log_operasi_kelas', function (Blueprint $table) {
            $table->foreignId('kelas_ajaran_asal_id')->nullable()->after('kelas_asal_id')
                ->constrained('t_kelas_ajaran')->restrictOnDelete();
            $table->foreignId('kelas_ajaran_tujuan_id')->nullable()->after('kelas_tujuan_id')
                ->constrained('t_kelas_ajaran')->restrictOnDelete();
        });

        // 2. Convert existing m_kelas rows → t_kelas_ajaran
        // Each old m_kelas has tingkat (enum) + tahun_ajaran_id + pegawai_id — map to new pivot table.
        // Map tingkat enum value to m_tingkat id (seeded by migration 000001).
        $tingkatMap = DB::table('m_tingkat')->pluck('id', 'nama'); // ['X' => 1, 'XI' => 2, 'XII' => 3]

        $oldKelas = DB::table('m_kelas')->get(['id', 'tingkat', 'tahun_ajaran_id', 'pegawai_id']);
        foreach ($oldKelas as $kelas) {
            $tingkatId = $tingkatMap[$kelas->tingkat] ?? null;
            if (! $tingkatId) {
                continue; // skip if tingkat cannot be mapped
            }
            DB::table('t_kelas_ajaran')->insertOrIgnore([
                'id'             => $kelas->id, // preserve same id so backfill SET kelas_ajaran_id = kelas_id works
                'kelas_id'       => $kelas->id,
                'tingkat_id'     => $tingkatId,
                'tahun_ajaran_id'=> $kelas->tahun_ajaran_id,
                'pegawai_id'     => $kelas->pegawai_id,
                'created_at'     => now(),
                'updated_at'     => now(),
            ]);
        }

        // 3. Backfill — kelas_ajaran.id now mirrors old m_kelas.id, so the mapping is 1:1
        DB::statement('UPDATE m_siswa SET kelas_ajaran_id = kelas_id WHERE kelas_id IS NOT NULL');
        DB::statement('UPDATE t_kelas_siswa SET kelas_ajaran_id = kelas_id');
        DB::statement('UPDATE t_jadwal_mengajar SET kelas_ajaran_id = kelas_id');
        // t_log_operasi_kelas: 0 rows, no backfill needed

        // 4. Add index on t_kelas_siswa
        Schema::table('t_kelas_siswa', function (Blueprint $table) {
            $table->index(['kelas_ajaran_id', 'selesai']);
        });

        // 4. Replace jadwal_slot_unique on t_jadwal_mengajar
        // Must drop FK on kelas_id first, as MySQL cannot drop the index while a FK references it
        // On SQLite we skip column drops (SQLite cannot drop FK-referenced columns)
        $isMysql = DB::getDriverName() === 'mysql';
        Schema::table('t_jadwal_mengajar', function (Blueprint $table) use ($isMysql) {
            if ($isMysql) {
                $table->dropForeign('t_jadwal_mengajar_kelas_id_foreign');
                $table->dropUnique('jadwal_slot_unique');
                $table->unique(['kelas_ajaran_id', 'hari', 'jam_pelajaran_id'], 'jadwal_slot_unique');
                $table->dropColumn('kelas_id');
            }
        });

        // 5. Drop old kelas_id columns and FKs from remaining tables
        if ($isMysql) {
            Schema::table('m_siswa', function (Blueprint $table) {
                $table->dropConstrainedForeignId('kelas_id');
            });

            Schema::table('t_kelas_siswa', function (Blueprint $table) {
                $table->dropConstrainedForeignId('kelas_id');
            });

            Schema::table('t_log_operasi_kelas', function (Blueprint $table) {
                $table->dropConstrainedForeignId('kelas_asal_id');
                $table->dropConstrainedForeignId('kelas_tujuan_id');
            });
        } else {
            // SQLite cannot drop FK-referenced columns — make them nullable so inserts still work
            Schema::table('t_kelas_siswa', function (Blueprint $table) {
                $table->unsignedBigInteger('kelas_id')->nullable()->change();
            });

            Schema::table('t_jadwal_mengajar', function (Blueprint $table) {
                $table->unsignedBigInteger('kelas_id')->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->foreignId('kelas_id')->nullable()->after('foto')
                ->constrained('m_kelas')->nullOnDelete();
        });
        DB::statement('UPDATE m_siswa SET kelas_id = kelas_ajaran_id');
        Schema::table('m_siswa', function (Blueprint $table) {
            $table->dropConstrainedForeignId('kelas_ajaran_id');
        });
    }
};
