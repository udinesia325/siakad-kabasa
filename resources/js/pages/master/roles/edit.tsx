import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { PermissionMatrix } from '@/components/master/roles/permission-matrix';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Auth } from '@/types';
import type { MatrixData } from '@/types/authorization';

type RoleData = {
    id: number;
    name: string;
    description: string | null;
    is_system: boolean;
    users_count: number;
    permissions: string[];
};

type Props = { role: RoleData; matrix: MatrixData };

export default function RolesEdit({ role, matrix }: Props) {
    const [permissions, setPermissions] = useState<string[]>(role.permissions);
    const { auth } = usePage<{ auth: Auth }>().props;
    const selfUsing = auth.roles.includes(role.name);

    return (
        <>
            <Head title={`Role: ${role.name}`} />
            <Form
                action={`/master/roles/${role.id}`}
                method="put"
                className="p-6"
            >
                {({ processing, errors }) => (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold">
                                Edit Role: {role.name}
                            </h1>
                            {role.users_count > 0 && (
                                <Link
                                    href={`/users?role=${role.id}`}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    {role.users_count} user menggunakan role ini
                                </Link>
                            )}
                        </div>

                        {selfUsing && (
                            <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                                Anda sedang menggunakan role ini — perubahan
                                akan langsung memengaruhi akses Anda setelah
                                disimpan.
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Role</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={role.name}
                                readOnly={role.is_system}
                                title={
                                    role.is_system
                                        ? 'Role bawaan, nama tidak dapat diubah'
                                        : undefined
                                }
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                name="description"
                                defaultValue={role.description ?? ''}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div>
                            <h2 className="mb-3 text-lg font-semibold">
                                Permission
                            </h2>
                            <PermissionMatrix
                                matrix={matrix}
                                selected={permissions}
                                onChange={setPermissions}
                            />
                            {permissions.map((p) => (
                                <input
                                    key={p}
                                    type="hidden"
                                    name="permissions[]"
                                    value={p}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPermissions(role.permissions)}
                            >
                                Reset
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}
