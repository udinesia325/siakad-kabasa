<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\WhatsappTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WhatsappTemplateController extends Controller
{
    public function index(): Response
    {
        $templates = WhatsappTemplate::orderBy('id')->get()->map(fn ($t) => [
            'id' => $t->id,
            'nama' => $t->nama,
            'variabel' => $t->variabelArray(),
            'text' => $t->text ?? '',
        ]);

        return Inertia::render('settings/whatsapp-template', [
            'templates' => $templates,
        ]);
    }

    public function update(Request $request, WhatsappTemplate $whatsappTemplate): RedirectResponse
    {
        $validated = $request->validate([
            'text' => ['required', 'string', 'max:4096'],
            'variabel_values' => ['nullable', 'array'],
            'variabel_values.*' => ['nullable', 'string', 'max:255'],
        ]);

        $whatsappTemplate->update(['text' => $validated['text']]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Template \"{$whatsappTemplate->nama}\" berhasil disimpan.",
        ]);

        return redirect()->back();
    }
}
