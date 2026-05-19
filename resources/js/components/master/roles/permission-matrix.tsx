import { Switch } from '@/components/ui/switch';
import type { MatrixData, Module } from '@/types/authorization';

type Props = {
    matrix: MatrixData;
    selected: string[];
    onChange: (next: string[]) => void;
};

const CRUD_ACTIONS = ['view', 'create', 'update', 'delete'] as const;

// Flatten all modules from matrix for view-autoselect lookup
function allModules(matrix: MatrixData): Module[] {
    return Object.values(matrix).flat();
}

export function PermissionMatrix({ matrix, selected, onChange }: Props) {
    const modules = allModules(matrix);

    const toggle = (perm: string, checked: boolean) => {
        if (!checked) {
            onChange(selected.filter((p) => p !== perm));
            return;
        }

        const next = new Set([...selected, perm]);

        // Auto-centang view jika permission bukan view itu sendiri
        const [moduleKey] = perm.split('.');
        const viewPerm = `${moduleKey}.view`;
        const mod = modules.find((m) => m.key === moduleKey);
        if (mod && (mod.resolved_actions ?? []).includes('view') && perm !== viewPerm) {
            next.add(viewPerm);
        }

        onChange([...next]);
    };

    const toggleGroup = (modules: Module[], checked: boolean) => {
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
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                                <Switch
                                    checked={allSelected}
                                    onCheckedChange={(v) =>
                                        toggleGroup(modules, v)
                                    }
                                />
                                Centang semua
                            </label>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/40">
                                    <tr>
                                        <th className="p-3 text-left font-medium">
                                            Modul
                                        </th>
                                        {CRUD_ACTIONS.map((a) => (
                                            <th
                                                key={a}
                                                className="p-3 font-medium capitalize"
                                            >
                                                {a}
                                            </th>
                                        ))}
                                        <th className="p-3 font-medium">
                                            Aksi khusus
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modules.map((m) => (
                                        <tr key={m.key} className="border-t">
                                            <td className="p-3">
                                                <div className="font-medium">
                                                    {m.label}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {m.type}
                                                </div>
                                            </td>
                                            {CRUD_ACTIONS.map((a) => {
                                                const has = (
                                                    m.resolved_actions ?? []
                                                ).includes(a);

                                                if (!has) {
                                                    return (
                                                        <td
                                                            key={a}
                                                            className="p-3 text-center text-muted-foreground/40"
                                                        >
                                                            —
                                                        </td>
                                                    );
                                                }

                                                const perm = `${m.key}.${a}`;

                                                return (
                                                    <td
                                                        key={a}
                                                        className="p-3 text-center"
                                                    >
                                                        <Switch
                                                            checked={selected.includes(
                                                                perm,
                                                            )}
                                                            onCheckedChange={(v) =>
                                                                toggle(perm, v)
                                                            }
                                                        />
                                                    </td>
                                                );
                                            })}
                                            <td className="p-3">
                                                <div className="flex flex-wrap gap-3">
                                                    {(m.resolved_actions ?? [])
                                                        .filter(
                                                            (a) =>
                                                                !CRUD_ACTIONS.includes(
                                                                    a as (typeof CRUD_ACTIONS)[number],
                                                                ),
                                                        )
                                                        .map((a) => {
                                                            const perm = `${m.key}.${a}`;

                                                            return (
                                                                <label
                                                                    key={a}
                                                                    className="flex cursor-pointer items-center gap-1.5"
                                                                >
                                                                    <Switch
                                                                        checked={selected.includes(
                                                                            perm,
                                                                        )}
                                                                        onCheckedChange={(v) =>
                                                                            toggle(perm, v)
                                                                        }
                                                                    />
                                                                    <span className="text-xs capitalize">
                                                                        {a}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
