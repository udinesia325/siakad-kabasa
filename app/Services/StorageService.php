<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StorageService
{
    public function upload(UploadedFile $file, string $folder): string
    {
        $extension = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '.' . $extension;
        $path = $folder . '/' . $filename;

        Storage::disk('r2')->put($path, $file->getStream());

        return $path;
    }

    public function url(string $path): string
    {
        return Storage::disk('r2')->url($path);
    }

    public function delete(string $path): void
    {
        Storage::disk('r2')->delete($path);
    }
}
