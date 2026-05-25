<?php

namespace App\Services\Waha\Exceptions;

class WahaRequestException extends WahaException
{
    public function __construct(
        string $message,
        public readonly int $statusCode = 0,
        public readonly string $responseBody = '',
    ) {
        parent::__construct($message);
    }

    public static function fromResponse(int $status, string $body): self
    {
        return new self(
            "WAHA API error (HTTP {$status}): {$body}",
            $status,
            $body,
        );
    }

    public static function connectionFailed(string $reason): self
    {
        return new self("WAHA connection failed: {$reason}");
    }
}
