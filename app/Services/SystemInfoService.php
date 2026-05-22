<?php

namespace App\Services;

class SystemInfoService
{
    public function collect(): array
    {
        return [
            'cpu' => $this->cpu(),
            'ram' => $this->ram(),
            'disk' => $this->disk(),
            'uptime' => $this->uptime(),
        ];
    }

    private function cpu(): array
    {
        try {
            if (PHP_OS_FAMILY === 'Linux') {
                return $this->cpuLinux();
            }
            if (PHP_OS_FAMILY === 'Darwin') {
                return $this->cpuMacos();
            }
        } catch (\Throwable) {
        }

        return ['usage_percent' => null, 'cores' => null];
    }

    private function cpuLinux(): array
    {
        $read = function (): array {
            $line = explode(' ', trim(shell_exec('grep "^cpu " /proc/stat') ?? ''));
            $values = array_filter($line, 'is_numeric');

            return array_values($values);
        };

        $a = $read();
        usleep(200000);
        $b = $read();

        if (count($a) < 4 || count($b) < 4) {
            return ['usage_percent' => null, 'cores' => null];
        }

        $idleA = (float) ($a[3] ?? 0);
        $totalA = (float) array_sum($a);
        $idleB = (float) ($b[3] ?? 0);
        $totalB = (float) array_sum($b);

        $deltaTotal = $totalB - $totalA;
        $deltaIdle = $idleB - $idleA;

        $usage = $deltaTotal > 0 ? round((1 - $deltaIdle / $deltaTotal) * 100, 1) : 0;
        $cores = (int) (trim(shell_exec('nproc') ?? '1') ?: 1);

        return ['usage_percent' => $usage, 'cores' => $cores];
    }

    private function cpuMacos(): array
    {
        $out = shell_exec('top -l 2 -n 0 | grep "CPU usage" | tail -1') ?? '';
        preg_match('/(\d+\.\d+)%\s+idle/i', $out, $m);
        $idle = isset($m[1]) ? (float) $m[1] : null;
        $usage = $idle !== null ? round(100 - $idle, 1) : null;

        $cores = (int) (trim(shell_exec('sysctl -n hw.logicalcpu') ?? '1') ?: 1);

        return ['usage_percent' => $usage, 'cores' => $cores];
    }

    private function ram(): array
    {
        try {
            if (PHP_OS_FAMILY === 'Linux') {
                return $this->ramLinux();
            }
            if (PHP_OS_FAMILY === 'Darwin') {
                return $this->ramMacos();
            }
        } catch (\Throwable) {
        }

        return ['used_gb' => null, 'total_gb' => null, 'usage_percent' => null];
    }

    private function ramLinux(): array
    {
        $out = shell_exec('cat /proc/meminfo') ?? '';
        preg_match('/MemTotal:\s+(\d+)/i', $out, $total);
        preg_match('/MemAvailable:\s+(\d+)/i', $out, $avail);

        if (! isset($total[1], $avail[1])) {
            return ['used_gb' => null, 'total_gb' => null, 'usage_percent' => null];
        }

        $totalKb = (float) $total[1];
        $availKb = (float) $avail[1];
        $usedKb = $totalKb - $availKb;

        return [
            'used_gb' => round($usedKb / 1024 / 1024, 2),
            'total_gb' => round($totalKb / 1024 / 1024, 2),
            'usage_percent' => round($usedKb / $totalKb * 100, 1),
        ];
    }

    private function ramMacos(): array
    {
        $totalBytes = (float) (trim(shell_exec('sysctl -n hw.memsize') ?? '0'));
        $vmStat = shell_exec('vm_stat') ?? '';

        preg_match('/page size of (\d+) bytes/', $vmStat, $ps);
        $pageSize = isset($ps[1]) ? (int) $ps[1] : 4096;

        preg_match('/Pages free:\s+(\d+)/', $vmStat, $free);
        preg_match('/Pages inactive:\s+(\d+)/', $vmStat, $inactive);
        $freePages = isset($free[1]) ? (int) $free[1] : 0;
        $inactivePages = isset($inactive[1]) ? (int) $inactive[1] : 0;

        $availBytes = ($freePages + $inactivePages) * $pageSize;
        $usedBytes = $totalBytes - $availBytes;

        if ($totalBytes <= 0) {
            return ['used_gb' => null, 'total_gb' => null, 'usage_percent' => null];
        }

        return [
            'used_gb' => round($usedBytes / 1024 / 1024 / 1024, 2),
            'total_gb' => round($totalBytes / 1024 / 1024 / 1024, 2),
            'usage_percent' => round($usedBytes / $totalBytes * 100, 1),
        ];
    }

    private function disk(): array
    {
        try {
            $out = shell_exec('df -m /') ?? '';
            $lines = array_filter(explode("\n", trim($out)));
            $line = end($lines);
            $parts = preg_split('/\s+/', trim($line));

            if (count($parts) < 5) {
                return [['mount' => '/', 'used_gb' => null, 'total_gb' => null, 'usage_percent' => null]];
            }

            $totalMb = (float) $parts[1];
            $usedMb = (float) $parts[2];
            $pct = $totalMb > 0 ? round($usedMb / $totalMb * 100, 1) : 0;

            return [[
                'mount' => '/',
                'used_gb' => round($usedMb / 1024, 2),
                'total_gb' => round($totalMb / 1024, 2),
                'usage_percent' => $pct,
            ]];
        } catch (\Throwable) {
            return [['mount' => '/', 'used_gb' => null, 'total_gb' => null, 'usage_percent' => null]];
        }
    }

    private function uptime(): array
    {
        try {
            if (PHP_OS_FAMILY === 'Linux') {
                $raw = trim(shell_exec('cat /proc/uptime') ?? '0');
                $seconds = (float) explode(' ', $raw)[0];
            } elseif (PHP_OS_FAMILY === 'Darwin') {
                $boottime = shell_exec('sysctl -n kern.boottime') ?? '';
                preg_match('/sec\s*=\s*(\d+)/', $boottime, $m);
                $seconds = isset($m[1]) ? (time() - (int) $m[1]) : 0;
            } else {
                $seconds = 0;
            }

            $days = (int) floor($seconds / 86400);
            $hours = (int) floor(($seconds % 86400) / 3600);
            $minutes = (int) floor(($seconds % 3600) / 60);

            return [
                'days' => $days,
                'hours' => $hours,
                'minutes' => $minutes,
                'hostname' => trim(shell_exec('hostname') ?? gethostname()),
                'os' => PHP_OS_FAMILY.' '.php_uname('r'),
            ];
        } catch (\Throwable) {
            return ['days' => null, 'hours' => null, 'minutes' => null, 'hostname' => null, 'os' => null];
        }
    }
}
