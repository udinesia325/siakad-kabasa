<?php

return [
    /*
    |--------------------------------------------------------------------------
    | CSRF Protection
    |--------------------------------------------------------------------------
    |
    | Set ke false untuk mematikan middleware ValidateCsrfToken sepenuhnya.
    | Default true (aktif). Hanya matikan untuk debugging lokal atau
    | skenario terkontrol — saat false, semua endpoint stateful rentan
    | terhadap CSRF attack.
    |
    */

    'csrf_enabled' => env('CSRF_ENABLED', true),
];
