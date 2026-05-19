<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', User::class) ?? false;
    }

    public function rules(): array
    {
        $assignableRoles = Role::pluck('name')->all();

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->whereNull('deleted_at')],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'account_type' => ['required', 'in:superadmin,staff'],
            'role' => [
                'nullable',
                'string',
                'required_if:account_type,staff',
                Rule::in($assignableRoles),
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($v) {
            if ($this->input('account_type') === 'superadmin' && ! $this->user()?->isSuperadmin()) {
                $v->errors()->add('account_type', 'Hanya superadmin yang dapat membuat akun superadmin.');
            }
        });
    }
}
