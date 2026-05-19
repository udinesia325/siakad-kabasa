<?php

return [
    // ── Akademik (Master Data) ─────────────────────────────────
    ['key' => 'tahun-ajaran',   'label' => 'Tahun Ajaran',   'group' => 'Master Data', 'icon' => 'School',            'route' => '/tahun-ajaran',   'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'kelas',          'label' => 'Kelas',          'group' => 'Master Data', 'icon' => 'GraduationCap',     'route' => '/kelas',          'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'siswa',          'label' => 'Siswa',          'group' => 'Master Data', 'icon' => 'Users',             'route' => '/siswa',          'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'pegawai',        'label' => 'Pegawai',        'group' => 'Master Data', 'icon' => 'BriefcaseBusiness', 'route' => '/pegawai',        'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'mata-pelajaran', 'label' => 'Mata Pelajaran', 'group' => 'Master Data', 'icon' => 'BookOpen',          'route' => '/mata-pelajaran', 'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'jam-pelajaran',  'label' => 'Jam Pelajaran',  'group' => 'Master Data', 'icon' => 'Clock',             'route' => '/jam-pelajaran',  'type' => 'crud',   'actions' => null,                          'sidebar' => true],

    // ── Operasional ────────────────────────────────────────────
    ['key' => 'kehadiran',       'label' => 'Kehadiran',       'group' => 'Operasional', 'icon' => 'UserCheck',     'route' => '/kehadiran',       'type' => 'custom', 'actions' => ['view', 'export', 'anulir'], 'sidebar' => true],
    ['key' => 'jadwal-mengajar', 'label' => 'Jadwal Mengajar', 'group' => 'Operasional', 'icon' => 'NotebookPen',   'route' => '/jadwal-mengajar', 'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'jadwal-absensi',  'label' => 'Jadwal Absensi',  'group' => 'Operasional', 'icon' => 'CalendarClock', 'route' => '/jadwal-absensi',  'type' => 'custom', 'actions' => ['view', 'update'],            'sidebar' => true],
    ['key' => 'hari-libur',      'label' => 'Hari Libur',      'group' => 'Operasional', 'icon' => 'CalendarOff',   'route' => '/hari-libur',      'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'absensi',         'label' => 'Scan Absensi',    'group' => 'Operasional', 'icon' => 'ScanLine',      'route' => '/absensi',         'type' => 'single', 'actions' => ['scan'],                      'sidebar' => false],

    // ── Sistem ─────────────────────────────────────────────────
    ['key' => 'users', 'label' => 'Pengguna', 'group' => 'Sistem', 'icon' => 'ShieldCheck', 'route' => '/users',        'type' => 'crud', 'actions' => null, 'sidebar' => true],
    ['key' => 'roles', 'label' => 'Role',     'group' => 'Sistem', 'icon' => 'KeyRound',    'route' => '/master/roles', 'type' => 'crud', 'actions' => null, 'sidebar' => true],
];
