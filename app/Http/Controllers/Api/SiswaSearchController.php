<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiswaSearchController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $q = trim($request->string('q'));

        if (mb_strlen($q) < 3) {
            return response()->json([]);
        }

        $statusInput = (string) $request->string('status');
        $status = in_array($statusInput, ['aktif', 'lulus', 'keluar'], true)
            ? $statusInput
            : 'aktif';
        $kelasAjaranId = $request->integer('kelas_ajaran_id') ?: null;

        $results = Siswa::query()
            ->with(['kelasAjaran.kelas', 'kelasAjaran.tingkat'])
            ->where('status', $status)
            ->where(function ($query) use ($q) {
                $query->where('nama', 'like', "%{$q}%")
                    ->orWhere('nisn', 'like', "%{$q}%");
            })
            ->when($kelasAjaranId, fn ($query) => $query->where('kelas_ajaran_id', $kelasAjaranId))
            ->orderBy('nama')
            ->limit(15)
            ->get(['id', 'nama', 'nisn', 'kelas_ajaran_id', 'status'])
            ->map(fn ($s) => [
                'id' => $s->id,
                'nama' => $s->nama,
                'nisn' => $s->nisn,
                'kelas_ajaran_id' => $s->kelas_ajaran_id,
                'kelas' => $s->kelasAjaran?->nama_lengkap,
                'status' => $s->status,
            ]);

        return response()->json($results);
    }
}
