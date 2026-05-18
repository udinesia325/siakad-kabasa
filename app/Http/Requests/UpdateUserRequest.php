<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('user')) ?? false;
    }

    public function rules(): array
    {
        $assignableRoles = Role::pluck('name')->all();

        $userId = $this->route('user')->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($userId)],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
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
