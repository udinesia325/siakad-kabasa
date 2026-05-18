<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;

class ConditionalCsrf extends PreventRequestForgery
{
    protected $except = [
        'api/absensi/scan',
    ];

    public function handle($request, Closure $next)
    {
        if (! config('security.csrf_enabled', true)) {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
