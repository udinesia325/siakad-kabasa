import { Switch } from '@/components/ui/switch';
import type { MatrixData, Module } from '@/types/authorization';

const VIEW_SCOPE_ACTIONS = ['view_scope_semua', 'view_scope_wali'] as const;
type ViewScopeAction = (typeof VIEW_SCOPE_ACTIONS)[number];

const VIEW_SCOPE_LABELS: Record<ViewScopeAction, string> = {
    view_scope_semua: 'Semua kelas',
    view_scope_wali: 'Wali kelas saja',
};

type Props = {
    matrix: MatrixData;
    selected: string[];
    onChange?: (next: string[]) => void;
    readOnly?: boolean;
};

const CRUD_ACTIONS = ['view', 'create', 'update', 'delete'] as const;

// Flatten all modules from matrix for view-autoselect lookup
function allModules(matrix: MatrixData): Module[] {
    return Object.values(matrix).flat();
}

export function PermissionMatrix({
    matrix,
    selected,
    onChange,
    readOnly = false,
}: Props) {
    const modules = allModules(matrix);

    const toggle = (perm: string, checked: boolean) => {
        if (readOnly || !onChange) {
            return;
        }

        if (!checked) {
            onChange(selected.filter((p) => p !== perm));

            return;
        }

        const next = new Set([...selected, perm]);

        const [moduleKey, action] = perm.split('.');

        // Jika memilih salah satu view_scope, lepas scope lainnya (mutex)
        if (VIEW_SCOPE_ACTIONS.includes(action as ViewScopeAction)) {
            for (const scopeAction of VIEW_SCOPE_ACTIONS) {
                if (scopeAction !== action) {
                    next.delete(`${moduleKey}.${scopeAction}`);
                }
            }
        }

        // Auto-centang view jika permission bukan view itu sendiri
        const viewPerm = `${moduleKey}.view`;
        const mod = modules.find((m) => m.key === moduleKey);

        if (
            mod &&
            (mod.resolved_actions ?? []).includes('view') &&
            perm !== viewPerm
        ) {
            next.add(viewPerm);
        }

        onChange([...next]);
    };

    const toggleGroup = (modules: Module[], checked: boolean) => {
        if (readOnly || !onChange) {
            return;
        }

        const groupPerms = modules.flatMap((m) =>
            (m.resolved_actions ?? []).map((a) => `${m.key}.${a}`),
        );

        if (checked) {
            onChange([...new Set([...selected, ...groupPerms])]);
        } else {
            onChange(selected.filter((p) => !groupPerms.includes(p)));
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {Object.entries(matrix).map(([group, modules]) => {
                const allGroupPerms = modules.flatMap((m) =>
                    (m.resolved_actions ?? []).map((a) => `${m.key}.${a}`),
                );
                const allSelected = allGroupPerms.every((p) =>
                    selected.includes(p),
                );

                return (
                    <div
                        key={group}
                        className="rounded-lg border bg-card text-card-foreground"
                    >
                        <div className="flex items-center justify-between border-b p-4">
                            <h3 className="font-semibold">{group}</h3>
                            {!readOnly && (
                                <label className="flex cursor-pointer items-center gap-2 text-sm">
                                    <Switch
                                        checked={allSelected}
                                        onCheckedChange={(v) =>
                                            toggleGroup(modules, v)
                                        }
                                    />
                                    Centang semua
                                </label>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="w-48 p-3 text-left font-medium">
                                            Modul
                                        </th>
                                        {CRUD_ACTIONS.map((a) => (
                                            <th
                                                key={a}
                                                className="w-20 p-3 font-medium capitalize"
                                            >
                                                {a}
                                            </th>
                                        ))}
                                        <th className="p-3 text-left font-medium">
                                            Aksi khusus
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modules.map((m) => {
                                        const hasViewScope = VIEW_SCOPE_ACTIONS.some(
                                            (sa) => (m.resolved_actions ?? []).includes(sa),
                                        );
                                        const regularActions = (m.resolved_actions ?? []).filter(
                                            (a) =>
                                                !CRUD_ACTIONS.includes(a as (typeof CRUD_ACTIONS)[number]) &&
                                                !VIEW_SCOPE_ACTIONS.includes(a as ViewScopeAction),
                                        );

                                        return (
                                            <tr key={m.key} className="border-t">
                                                <td className="w-48 p-3">
                                                    <div className="font-medium">
                                                        {m.label}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {m.type}
                                                    </div>
                                                </td>
                                                {CRUD_ACTIONS.map((a) => {
                                                    const has = (m.resolved_actions ?? []).includes(a);

                                                    if (!has) {
                                                        return (
                                                            <td
                                                                key={a}
                                                                className="w-20 p-3 text-center text-muted-foreground/40"
                                                            >
                                                                —
                                                            </td>
                                                        );
                                                    }

                                                    const perm = `${m.key}.${a}`;

                                                    return (
                                                        <td key={a} className="w-20 p-3 text-center">
                                                            <Switch
                                                                checked={selected.includes(perm)}
                                                                onCheckedChange={(v) => toggle(perm, v)}
                                                                disabled={readOnly}
                                                            />
                                                        </td>
                                                    );
                                                })}
                                                <td className="p-3">
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                                        {/* Aksi khusus biasa (bukan view_scope) */}
                                                        {regularActions.map((a) => {
                                                            const perm = `${m.key}.${a}`;

                                                            return (
                                                                <label
                                                                    key={a}
                                                                    className="flex cursor-pointer items-center gap-1.5"
                                                                >
                                                                    <Switch
                                                                        checked={selected.includes(perm)}
                                                                        onCheckedChange={(v) => toggle(perm, v)}
                                                                        disabled={readOnly}
                                                                    />
                                                                    <span className="text-xs capitalize">{a}</span>
                                                                </label>
                                                            );
                                                        })}

                                                        {/* View scope — dua tombol pill mutex */}
                                                        {hasViewScope && (
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-xs text-muted-foreground">
                                                                    Mode tampilan kelas
                                                                </span>
                                                                <div className="flex overflow-hidden rounded-md border text-xs">
                                                                    {VIEW_SCOPE_ACTIONS.filter((sa) =>
                                                                        (m.resolved_actions ?? []).includes(sa),
                                                                    ).map((sa, idx, arr) => {
                                                                        const active = selected.includes(`${m.key}.${sa}`);

                                                                        return (
                                                                            <button
                                                                                key={sa}
                                                                                type="button"
                                                                                disabled={readOnly}
                                                                                onClick={() => {
                                                                                    if (!readOnly) {
                                                                                        toggle(`${m.key}.${sa}`, true);
                                                                                    }
                                                                                }}
                                                                                className={[
                                                                                    'px-3 py-1 transition-colors',
                                                                                    idx < arr.length - 1 ? 'border-r' : '',
                                                                                    active
                                                                                        ? 'bg-primary text-primary-foreground'
                                                                                        : 'bg-background text-muted-foreground hover:bg-muted',
                                                                                    readOnly ? 'cursor-default opacity-60' : 'cursor-pointer',
                                                                                ].join(' ')}
                                                                            >
                                                                                {VIEW_SCOPE_LABELS[sa]}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
