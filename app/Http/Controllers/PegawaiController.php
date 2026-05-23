<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePegawaiRequest;
use App\Http\Requests\UpdatePegawaiRequest;
use App\Models\Pegawai;
use App\Models\Rfid;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class PegawaiController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Pegawai::query()->with(['user:id,email', 'rfid:id,kode_rfid,reff_type,reff_id']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', "%{$request->search}%")
                    ->orWhere('nik', 'like', "%{$request->search}%")
                    ->orWhere('nuptk', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $status = $request->input('status', 'aktif');
        if ($status === 'aktif') {
            $query->where('aktif', true);
        } elseif ($status === 'nonaktif') {
            $query->where('aktif', false);
        }

        return Inertia::render('akademik/pegawai/index', [
            'pegawai' => $query->orderBy('nama')->paginate(20)->withQueryString(),
            'filters' => $request->only(['search', 'jenis', 'status']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('akademik/pegawai/create');
    }

    public function store(StorePegawaiRequest $request): RedirectResponse
    {
        Pegawai::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pegawai berhasil ditambahkan.']);

        return redirect()->route('pegawai.index');
    }

    public function show(Pegawai $pegawai): Response
    {
        $pegawai->load(['user:id,email', 'rfid:id,kode_rfid,reff_type,reff_id']);

        if ($pegawai->user) {
            $pegawai->user->load('roles:id,name');
        }

        return Inertia::render('akademik/pegawai/show', [
            'pegawai' => $pegawai,
            'assignableRoles' => Role::orderBy('name')->pluck('name'),
        ]);
    }

    public function edit(Pegawai $pegawai): Response
    {
        return Inertia::render('akademik/pegawai/edit', [
            'pegawai' => $pegawai,
        ]);
    }

    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai): RedirectResponse
    {
        $pegawai->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pegawai berhasil diperbarui.']);

        return redirect()->route('pegawai.index');
    }

    public function destroy(Pegawai $pegawai): RedirectResponse
    {
        $pegawai->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Pegawai berhasil dihapus.']);

        return redirect()->route('pegawai.index');
    }

    public function assignUser(Request $request, Pegawai $pegawai): RedirectResponse
    {
        if (empty($pegawai->email)) {
            throw ValidationException::withMessages([
                'password' => 'Pegawai harus memiliki email terlebih dahulu sebelum diberi akun login.',
            ]);
        }

        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        DB::transaction(function () use ($pegawai, $validated) {
            if ($pegawai->user) {
                $pegawai->user->update([
                    'password' => Hash::make($validated['password']),
                    'email' => $pegawai->email,
                    'name' => $pegawai->nama,
                ]);
                if (! $pegawai->user->hasRole('pegawai')) {
                    $pegawai->user->assignRole('pegawai');
                }

                return;
            }

            $user = User::create([
                'name' => $pegawai->nama,
                'email' => $pegawai->email,
                'password' => Hash::make($validated['password']),
                'email_verified_at' => now(),
            ]);
            $user->assignRole('pegawai');

            $pegawai->update(['user_id' => $user->id]);
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Akun login berhasil diatur untuk '.$pegawai->nama.'.']);

        return redirect()->back();
    }

    public function revokeUser(Pegawai $pegawai): RedirectResponse
    {
        DB::transaction(function () use ($pegawai) {
            $user = $pegawai->user;
            $pegawai->update(['user_id' => null]);
            $user?->delete();
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Akun login dicabut.']);

        return redirect()->back();
    }

    public function assignRole(Request $request, Pegawai $pegawai): RedirectResponse
    {
        if (! $pegawai->user) {
            abort(422, 'Pegawai belum memiliki akun login.');
        }

        $validated = $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $pegawai->user->syncRoles([$validated['role']]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role berhasil diperbarui untuk '.$pegawai->nama.'.']);

        return redirect()->back();
    }

    public function assignRfid(Request $request, Pegawai $pegawai): RedirectResponse
    {
        $validated = $request->validate([
            'kode_rfid' => [
                'required', 'string', 'max:255',
                Rule::unique('t_rfid', 'kode_rfid')->ignore(
                    Rfid::where('reff_type', 'm_pegawai')->where('reff_id', $pegawai->id)->value('id')
                ),
            ],
        ]);

        $rfid = Rfid::where('reff_type', 'm_pegawai')->where('reff_id', $pegawai->id)->first();

        if ($rfid) {
            $rfid->update(['kode_rfid' => $validated['kode_rfid'], 'dibuat_pada' => now()]);
        } else {
            Rfid::create([
                'kode_rfid' => $validated['kode_rfid'],
                'reff_type' => 'm_pegawai',
                'reff_id' => $pegawai->id,
                'dibuat_pada' => now(),
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kartu RFID terhubung dengan '.$pegawai->nama.'.']);

        return redirect()->back();
    }
}
