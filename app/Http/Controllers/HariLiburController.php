<?php

namespace App\Http\Controllers;

use App\Models\HariLibur;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HariLiburController extends Controller
{
    public function index(Request $request): Response
    {
        $query = HariLibur::with('dibuatOleh:id,name')
            ->orderByDesc('tanggal');

        // Filter rentang tanggal (dari-sampai) mengalahkan filter tahun
        if ($request->filled('dari') && $request->filled('sampai')) {
            $query->whereBetween('tanggal', [$request->dari, $request->sampai]);
        } elseif ($request->filled('tahun')) {
            $query->whereYear('tanggal', $request->tahun);
        } else {
            $query->whereYear('tanggal', now()->year);
        }

        return Inertia::render('akademik/hari-libur/index', [
            'hariLibur' => $query->paginate(20)->withQueryString(),
            'filters'   => $request->only(['tahun', 'dari', 'sampai']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'mode' => ['required', 'in:tunggal,rentang'],
            'tanggal' => ['required_if:mode,tunggal', 'nullable', 'date', 'unique:m_hari_libur,tanggal'],
            'dari' => ['required_if:mode,rentang', 'nullable', 'date'],
            'sampai' => ['required_if:mode,rentang', 'nullable', 'date', 'after_or_equal:dari'],
            'keterangan' => ['required', 'string', 'max:255'],
        ]);

        $userId = Auth::id();

        if ($data['mode'] === 'tunggal') {
            HariLibur::firstOrCreate(
                ['tanggal' => $data['tanggal']],
                ['keterangan' => $data['keterangan'], 'dibuat_oleh' => $userId],
            );
        } else {
            $current = Carbon::parse($data['dari']);
            $sampai = Carbon::parse($data['sampai']);

            while ($current->lte($sampai)) {
                HariLibur::firstOrCreate(
                    ['tanggal' => $current->toDateString()],
                    ['keterangan' => $data['keterangan'], 'dibuat_oleh' => $userId],
                );
                $current->addDay();
            }
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Hari libur berhasil ditambahkan.']);

        return redirect()->back();
    }

    public function update(Request $request, HariLibur $hariLibur): RedirectResponse
    {
        $request->merge(['tanggal' => $request->date('tanggal')?->toDateString()]);

        $data = $request->validate([
            'tanggal' => ['required', 'date', "unique:m_hari_libur,tanggal,{$hariLibur->id}"],
            'keterangan' => ['required', 'string', 'max:255'],
        ]);

        $hariLibur->update($data);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Hari libur berhasil diperbarui.']);

        return redirect()->back();
    }

    public function destroy(Request $request, HariLibur $hariLibur): RedirectResponse
    {
        $isPast = $hariLibur->tanggal->lt(now()->startOfDay());

        if ($isPast && ! $request->boolean('confirmed_past')) {
            abort(422, 'Hari libur yang sudah terlewati memerlukan konfirmasi tambahan.');
        }

        $hariLibur->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Hari libur berhasil dihapus.']);

        return redirect()->back();
    }
}
