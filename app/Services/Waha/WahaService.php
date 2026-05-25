<?php

namespace App\Services\Waha;

use App\Services\Waha\Traits\HasChatActions;
use App\Services\Waha\Traits\HasSessionManagement;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class WahaService
{
    use HasChatActions, HasSessionManagement;

    protected string $session;

    private string $baseUrl;

    private string $apiKey;

    public function __construct()
    {
        $this->session = config('services.waha.session_name');
        $this->baseUrl = config('services.waha.base_url');
        $this->apiKey = config('services.waha.api_key');
    }

    protected function http(): PendingRequest
    {
        return Http::baseUrl($this->baseUrl)
            ->withHeader('X-Api-Key', $this->apiKey)
            ->timeout(15)
            ->acceptJson();
    }
}
