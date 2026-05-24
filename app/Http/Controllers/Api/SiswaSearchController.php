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

        $status = $request->string('status', 'aktif');
        $kelasId = $request->integer('kelas_id') ?: null;

        $results = Siswa::query()
            ->with('kelas:id,nama')
            ->where('status', $status)
            ->where(function ($query) use ($q) {
                $query->where('nama', 'like', "%{$q}%")
                    ->orWhere('nisn', 'like', "%{$q}%");
            })
            ->when($kelasId, fn ($query) => $query->where('kelas_id', $kelasId))
            ->orderBy('nama')
            ->limit(15)
            ->get(['id', 'nama', 'nisn', 'kelas_id', 'status'])
            ->map(fn ($s) => [
                'id'       => $s->id,
                'nama'     => $s->nama,
                'nisn'     => $s->nisn,
                'kelas_id' => $s->kelas_id,
                'kelas'    => $s->kelas?->nama,
                'status'   => $s->status,
            ]);

        return response()->json($results);
    }
}
