<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMasterKelasRequest;
use App\Models\Kelas;
use Illuminate\Http\JsonResponse;

class MasterKelasController extends Controller
{
    public function index(): JsonResponse
    {
        $kelas = Kelas::with('jurusan')->orderBy('nama')->get(['id', 'nama', 'rombel', 'jurusan_id', 'jenis_kelas_id']);

        return response()->json($kelas);
    }

    public function store(StoreMasterKelasRequest $request): JsonResponse
    {
        $kelas = Kelas::create($request->validated());

        return response()->json([
            'id' => $kelas->id,
            'nama' => $kelas->nama,
        ], 201);
    }

    public function update(StoreMasterKelasRequest $request, Kelas $kelas): JsonResponse
    {
        $kelas->update($request->validated());

        return response()->json([
            'id' => $kelas->id,
            'nama' => $kelas->nama,
        ]);
    }
}
