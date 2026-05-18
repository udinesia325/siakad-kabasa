import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { PermissionMatrix } from '@/components/master/roles/permission-matrix';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { MatrixData } from '@/types/authorization';

type Props = { matrix: MatrixData };

export default function RolesCreate({ matrix }: Props) {
    const [permissions, setPermissions] = useState<string[]>([]);

    return (
        <>
            <Head title="Tambah Role" />
            <Form action="/master/roles" method="post" className="p-6">
                {({ processing, errors }) => (
                    <div className="flex flex-col gap-6">
                        <h1 className="text-2xl font-semibold">Tambah Role</h1>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Role</Label>
                            <Input id="name" name="name" required />
                            <p className="text-xs text-muted-foreground">
                                Huruf kecil, angka, tanda hubung. Contoh:
                                admin-absensi
                            </p>
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea id="description" name="description" />
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
