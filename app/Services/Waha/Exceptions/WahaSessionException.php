<?php

namespace App\Services\Waha\Exceptions;

class WahaSessionException extends WahaException
{
    public static function notFound(string $session): self
    {
        return new self("WAHA session '{$session}' not found.");
    }

    public static function unavailable(string $session, string $status): self
    {
        return new self("WAHA session '{$session}' unavailable (status: {$status}).");
    }
}
