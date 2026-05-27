<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTingkatRequest;
use App\Http\Requests\UpdateTingkatRequest;
use App\Models\Tingkat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TingkatController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Tingkat::orderBy('jenjang')->orderBy('urutan');

        if ($request->filled('search')) {
            $query->where('nama', 'like', "%{$request->search}%");
        }

        return Inertia::render('master/tingkat/index', [
            'tingkat' => $query->paginate(20)->withQueryString(),
            'filters' => $request->only('search'),
        ]);
    }

    public function store(StoreTingkatRequest $request): RedirectResponse
    {
        Tingkat::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tingkat berhasil ditambahkan.']);

        return redirect()->route('tingkat.index');
    }

    public function update(UpdateTingkatRequest $request, Tingkat $tingkat): RedirectResponse
    {
        $tingkat->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tingkat berhasil diperbarui.']);

        return redirect()->route('tingkat.index');
    }

    public function destroy(Tingkat $tingkat): RedirectResponse
    {
        if ($tingkat->kelasAjaran()->exists()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => "Tingkat {$tingkat->nama} tidak dapat dihapus karena masih digunakan."]);

            return redirect()->route('tingkat.index');
        }

        $tingkat->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Tingkat berhasil dihapus.']);

        return redirect()->route('tingkat.index');
    }
}
