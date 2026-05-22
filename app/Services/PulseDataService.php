<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class PulseDataService
{
    public function collect(): array
    {
        return [
            'slow_queries' => $this->slowQueries(),
            'exceptions' => $this->exceptions(),
            'cache' => $this->cache(),
            'requests' => $this->requests(),
            'queue' => $this->queue(),
            'top_users' => $this->topUsers(),
        ];
    }

    private function slowQueries(): array
    {
        return DB::table('pulse_entries')
            ->select('key', DB::raw('COUNT(*) as count'), DB::raw('MAX(value) as max_ms'))
            ->where('type', 'slow_query')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->groupBy('key')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(fn ($r) => [
                'sql' => $this->truncate($r->key, 100),
                'count' => (int) $r->count,
                'max_ms' => (int) $r->max_ms,
            ])
            ->toArray();
    }

    private function exceptions(): array
    {
        return DB::table('pulse_entries')
            ->select('key', DB::raw('COUNT(*) as count'))
            ->where('type', 'exception')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->groupBy('key')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(fn ($r) => [
                'class' => $this->truncate($r->key, 80),
                'count' => (int) $r->count,
            ])
            ->toArray();
    }

    private function cache(): array
    {
        $hits = (int) DB::table('pulse_entries')
            ->where('type', 'cache_hit')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->count();
        $misses = (int) DB::table('pulse_entries')
            ->where('type', 'cache_miss')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->count();

        $total = $hits + $misses;
        $hitRate = $total > 0 ? round($hits / $total * 100, 1) : 0;

        return [
            'hit_rate' => $hitRate,
            'hits' => $hits,
            'misses' => $misses,
        ];
    }

    private function requests(): array
    {
        return DB::table('pulse_entries')
            ->select('key', DB::raw('COUNT(*) as count'), DB::raw('AVG(value) as avg_ms'))
            ->where('type', 'slow_request')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->groupBy('key')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(fn ($r) => [
                'endpoint' => $this->truncate($r->key, 80),
                'count' => (int) $r->count,
                'avg_ms' => (int) round($r->avg_ms),
            ])
            ->toArray();
    }

    private function queue(): array
    {
        $processed = (int) DB::table('pulse_entries')
            ->where('type', 'queued_job')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->count();
        $failed = (int) DB::table('pulse_entries')
            ->where('type', 'job_failure')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->count();

        return [
            'processed' => $processed,
            'failed' => $failed,
        ];
    }

    private function topUsers(): array
    {
        return DB::table('pulse_entries')
            ->select('key', DB::raw('COUNT(*) as count'))
            ->where('type', 'user_request')
            ->where('timestamp', '>=', now()->subDay()->timestamp)
            ->groupBy('key')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(fn ($r) => [
                'user_id' => $r->key,
                'count' => (int) $r->count,
            ])
            ->toArray();
    }

    private function truncate(string $str, int $len): string
    {
        return mb_strlen($str) > $len ? mb_substr($str, 0, $len).'…' : $str;
    }
}
