import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useFlashToast } from '@/hooks/use-flash-toast';

// ─── Types ────────────────────────────────────────────────────────────────────

type Template = {
    id: number;
    nama: string;
    variabel: string[];
    text: string;
};

type Props = { templates: Template[] };

// ─── WhatsApp formatting renderer ─────────────────────────────────────────────

function renderWhatsapp(text: string): string {
    // Escape HTML terlebih dahulu
    const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return escaped
        // Bold: *text*
        .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
        // Italic: _text_
        .replace(/_([^_\n]+)_/g, '<em>$1</em>')
        // Strikethrough: ~text~
        .replace(/~([^~\n]+)~/g, '<s>$1</s>')
        // Monospace: ```text```
        .replace(/```([^`]+)```/g, '<code class="font-mono bg-black/10 rounded px-0.5">$1</code>')
        // Newline → <br>
        .replace(/\n/g, '<br>');
}

function applyVariables(text: string, values: Record<string, string>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
}

// ─── WhatsApp Bubble ──────────────────────────────────────────────────────────

function WhatsappBubble({ text }: { text: string }) {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;

    return (
        <div className="flex min-h-24 flex-col rounded-lg bg-[#e9f5e9] p-3">
            {/* Header */}
            <div className="mb-2 flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#25d366]" />
                <span className="text-xs font-semibold text-[#128c7e]">Preview Pesan</span>
            </div>

            {/* Chat area */}
            <div className="flex flex-1 flex-col items-end gap-1">
                <div className="relative max-w-[90%] rounded-lg rounded-tr-none bg-white px-3 py-2 shadow-sm">
                    {/* Ekor bubble */}
                    <div className="absolute -top-0 right-0 h-0 w-0 translate-x-full border-b-8 border-l-8 border-b-transparent border-l-white" />

                    {text.trim() ? (
                        <p
                            className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-800"
                            dangerouslySetInnerHTML={{
                                __html: renderWhatsapp(text),
                            }}
                        />
                    ) : (
                        <p className="text-sm italic text-gray-400">Tulis pesan di textarea...</p>
                    )}

                    <div className="mt-1 flex items-center justify-end gap-1">
                        <span className="text-[10px] text-gray-400">{time}</span>
                        {/* Double centang biru */}
                        <svg viewBox="0 0 16 11" className="h-3 w-4 fill-[#53bdeb]">
                            <path d="M11.071.653a.75.75 0 0 1 .045 1.06l-6.5 7a.75.75 0 0 1-1.138-.036l-2.5-3a.75.75 0 1 1 1.144-.972l1.96 2.352 5.93-6.358a.75.75 0 0 1 1.059-.046Z" />
                            <path d="M14.071.653a.75.75 0 0 1 .045 1.06l-6.5 7a.75.75 0 0 1-1.06.045L5.5 7.5l.972-1.144 1.004.855 5.536-5.512a.75.75 0 0 1 1.059-.046Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Template Row ─────────────────────────────────────────────────────────────

function TemplateRow({ template }: { template: Template }) {
    const [varValues, setVarValues] = useState<Record<string, string>>(
        Object.fromEntries(template.variabel.map((v) => [v, ''])),
    );

    const form = useForm({ text: template.text });

    const preview = applyVariables(form.data.text, varValues);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.patch(`/settings/whatsapp-template/${template.id}`, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <tr className="border-b align-top last:border-0">
            {/* Nama */}
            <td className="py-4 pl-4 pr-6">
                <p className="text-base font-bold leading-snug">{template.nama}</p>
            </td>

            {/* Variabel + input nilai */}
            <td className="py-4 pr-4">
                {template.variabel.length === 0 ? (
                    <span className="text-xs italic text-muted-foreground">Tidak ada variabel</span>
                ) : (
                    <div className="flex flex-col gap-3">
                        {template.variabel.map((v) => (
                            <div key={v} className="flex flex-col gap-1">
                                <label className="flex items-center gap-1.5">
                                    <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary">
                                        {`{{${v}}}`}
                                    </code>
                                </label>
                                <input
                                    type="text"
                                    placeholder={`Contoh nilai...`}
                                    value={varValues[v]}
                                    onChange={(e) =>
                                        setVarValues((prev) => ({ ...prev, [v]: e.target.value }))
                                    }
                                    className="h-8 w-full rounded-md border bg-background px-2.5 text-xs shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </td>

            {/* Textarea teks template */}
            <td className="py-4 pr-4">
                <form id={`form-${template.id}`} onSubmit={handleSubmit}>
                    <textarea
                        value={form.data.text}
                        onChange={(e) => form.setData('text', e.target.value)}
                        rows={Math.max(6, (template.text.match(/\n/g)?.length ?? 0) + 1)}
                        className="w-full min-w-[220px] rounded-md border bg-background px-3 py-2 font-mono text-xs shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        placeholder="Tulis template pesan di sini..."
                    />
                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">
                            *bold* _italic_ ~coret~ {`\`\`\`mono\`\`\``}
                        </span>
                        <button
                            type="submit"
                            form={`form-${template.id}`}
                            disabled={form.processing}
                            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </td>

            {/* Preview bubble WhatsApp */}
            <td className="py-4">
                <div className="min-w-[240px] max-w-xs">
                    <WhatsappBubble text={preview} />
                </div>
            </td>
        </tr>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WhatsappTemplatePage({ templates }: Props) {
    useFlashToast();

    return (
        <>
            <Head title="Template WhatsApp" />
            <div className="space-y-4">
                <div>
                    <h2 className="text-base font-semibold">Template Pesan WhatsApp</h2>
                    <p className="text-sm text-muted-foreground">
                        Atur teks pesan yang dikirim ke orang tua siswa. Gunakan variabel{' '}
                        <code className="rounded bg-muted px-1 text-xs">{'{{nama_variabel}}'}</code>{' '}
                        yang akan diganti otomatis saat pengiriman.
                    </p>
                </div>

                {templates.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">Belum ada template.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    <th className="px-4 py-3 text-left">Nama</th>
                                    <th className="px-4 py-3 text-left">Variabel & Nilai Contoh</th>
                                    <th className="px-4 py-3 text-left">Teks Template</th>
                                    <th className="px-4 py-3 text-left">Preview</th>
                                </tr>
                            </thead>
                            <tbody className="px-4">
                                {templates.map((t) => (
                                    <TemplateRow key={t.id} template={t} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

WhatsappTemplatePage.layout = {
    breadcrumbs: [{ title: 'Template WhatsApp', href: '/settings/whatsapp-template' }],
};
