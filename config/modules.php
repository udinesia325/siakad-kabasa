<?php

return [
    // ── Akademik (Master Data) ─────────────────────────────────
    ['key' => 'tahun-ajaran',   'label' => 'Tahun Ajaran',   'group' => 'Master Data', 'icon' => 'School',            'route' => '/tahun-ajaran',   'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'kelas',          'label' => 'Kelas',          'group' => 'Master Data', 'icon' => 'GraduationCap',     'route' => '/kelas',          'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'tingkat',        'label' => 'Tingkat',        'group' => 'Master Data', 'icon' => 'Layers',            'route' => '/tingkat',        'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'jenis-kelas',    'label' => 'Jenis Kelas',    'group' => 'Master Data', 'icon' => 'Tag',               'route' => '/settings/jenis-kelas', 'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'siswa',          'label' => 'Siswa',          'group' => 'Master Data', 'icon' => 'Users',             'route' => '/siswa',          'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'pegawai',        'label' => 'Pegawai',        'group' => 'Master Data', 'icon' => 'BriefcaseBusiness', 'route' => '/pegawai',        'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'mata-pelajaran', 'label' => 'Mata Pelajaran', 'group' => 'Master Data', 'icon' => 'BookOpen',          'route' => '/mata-pelajaran', 'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'jam-pelajaran',  'label' => 'Jam Pelajaran',  'group' => 'Master Data', 'icon' => 'Clock',             'route' => '/jam-pelajaran',  'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'buku-tamu', 'label' => 'Buku Tamu', 'group' => 'Master Data', 'icon' => 'BookUser', 'route' => '/buku-tamu', 'type' => 'crud', 'actions' => null, 'sidebar' => true],
    ['key' => 'ppdb', 'label' => 'Pendaftaran Siswa (PPDB)', 'group' => 'Master Data', 'icon' => 'ClipboardList', 'route' => '/ppdb', 'type' => 'crud', 'actions' => null, 'sidebar' => true],

    // ── Operasional ────────────────────────────────────────────
    ['key' => 'kehadiran',       'label' => 'Kehadiran',       'group' => 'Operasional', 'icon' => 'UserCheck',     'route' => '/kehadiran',       'type' => 'custom', 'actions' => ['view', 'view_scope_semua', 'view_scope_wali', 'export', 'anulir'], 'sidebar' => true],
    ['key' => 'jurnal', 'label' => 'Jurnal Mengajar', 'group' => 'Operasional', 'icon' => 'BookMarked', 'route' => '/jurnal', 'type' => 'custom', 'actions' => ['view', 'view_scope_semua', 'create'], 'sidebar' => true],
    ['key' => 'statistik-absensi', 'label' => 'Statistik Absensi', 'group' => 'Operasional', 'icon' => 'ChartColumn', 'route' => '/statistik-absensi', 'type' => 'custom', 'actions' => ['view'], 'sidebar' => true],
    ['key' => 'jadwal-mengajar', 'label' => 'Jadwal Mengajar', 'group' => 'Operasional', 'icon' => 'NotebookPen',   'route' => '/jadwal-mengajar', 'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'jadwal-absensi',  'label' => 'Jadwal Absensi',  'group' => 'Operasional', 'icon' => 'CalendarClock', 'route' => '/jadwal-absensi',  'type' => 'custom', 'actions' => ['view', 'update'],            'sidebar' => true],
    ['key' => 'hari-libur',      'label' => 'Hari Libur',      'group' => 'Operasional', 'icon' => 'CalendarOff',   'route' => '/hari-libur',      'type' => 'crud',   'actions' => null,                          'sidebar' => true],
    ['key' => 'absensi',         'label' => 'Scan Absensi',    'group' => 'Operasional', 'icon' => 'ScanLine',      'route' => '/absensi',         'type' => 'single', 'actions' => ['scan'],                      'sidebar' => false],

    // ── Sistem ─────────────────────────────────────────────────
    ['key' => 'users', 'label' => 'Pengguna', 'group' => 'Sistem', 'icon' => 'ShieldCheck', 'route' => '/users',        'type' => 'crud', 'actions' => null, 'sidebar' => true],
    ['key' => 'roles', 'label' => 'Role',     'group' => 'Sistem', 'icon' => 'KeyRound',    'route' => '/master/roles', 'type' => 'crud', 'actions' => null, 'sidebar' => true],
    ['key' => 'server-monitor', 'label' => 'Server Monitor', 'group' => 'Sistem', 'icon' => 'MonitorCheck', 'route' => '/sistem/server-monitor', 'type' => 'custom', 'actions' => ['view'], 'sidebar' => true],
    ['key' => 'whatsapp', 'label' => 'WhatsApp Session', 'group' => 'Sistem', 'icon' => 'MessageCircle', 'route' => '/settings/whatsapp', 'type' => 'single', 'actions' => ['view'], 'sidebar' => true],

    // ── Sarpras ────────────────────────────────────────────────
    ['key' => 'sarpras.dashboard',       'label' => 'Dashboard Sarpras',  'group' => 'Sarpras', 'icon' => 'LayoutGrid',    'route' => '/sarpras',                  'type' => 'custom', 'actions' => ['view'],                                          'sidebar' => true],
    ['key' => 'sarpras.barang',          'label' => 'Data Barang',         'group' => 'Sarpras', 'icon' => 'Package',       'route' => '/sarpras/barang',           'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'sarpras.kategori',        'label' => 'Kategori Barang',     'group' => 'Sarpras', 'icon' => 'Tag',           'route' => '/sarpras/kategori',         'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'sarpras.lokasi',          'label' => 'Lokasi / Ruangan',    'group' => 'Sarpras', 'icon' => 'MapPin',        'route' => '/sarpras/lokasi',           'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'sarpras.vendor',          'label' => 'Vendor / Supplier',   'group' => 'Sarpras', 'icon' => 'Truck',         'route' => '/sarpras/vendor',           'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'sarpras.peminjaman',      'label' => 'Peminjaman',          'group' => 'Sarpras', 'icon' => 'Handshake',     'route' => '/sarpras/peminjaman',       'type' => 'custom', 'actions' => ['view', 'create', 'update', 'delete', 'approve'], 'sidebar' => true],
    ['key' => 'sarpras.booking-ruangan', 'label' => 'Booking Ruangan',     'group' => 'Sarpras', 'icon' => 'CalendarCheck', 'route' => '/sarpras/booking-ruangan',  'type' => 'custom', 'actions' => ['view', 'create', 'update', 'delete', 'approve'], 'sidebar' => true],
    ['key' => 'sarpras.kerusakan',       'label' => 'Laporan Kerusakan',   'group' => 'Sarpras', 'icon' => 'Wrench',        'route' => '/sarpras/kerusakan',        'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'sarpras.maintenance',     'label' => 'Maintenance',         'group' => 'Sarpras', 'icon' => 'Settings',      'route' => '/sarpras/maintenance',      'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'sarpras.laporan',         'label' => 'Laporan',             'group' => 'Sarpras', 'icon' => 'FileText',      'route' => '/sarpras/laporan',          'type' => 'custom', 'actions' => ['view', 'export'],                                'sidebar' => true],

    // ── Wakasis ────────────────────────────────────────────────
    ['key' => 'wakasis.dashboard',          'label' => 'Dashboard Wakasis',   'group' => 'Wakasis', 'icon' => 'LayoutGrid',     'route' => '/wakasis',                       'type' => 'custom', 'actions' => ['view'],                                          'sidebar' => true],
    ['key' => 'wakasis.jenis-pelanggaran',  'label' => 'Jenis Pelanggaran',   'group' => 'Wakasis', 'icon' => 'AlertTriangle',  'route' => '/wakasis/jenis-pelanggaran',     'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.poin-pelanggaran',   'label' => 'Poin Pelanggaran',    'group' => 'Wakasis', 'icon' => 'Minus',          'route' => '/wakasis/poin-pelanggaran',      'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.jenis-prestasi',     'label' => 'Jenis Prestasi',      'group' => 'Wakasis', 'icon' => 'Trophy',         'route' => '/wakasis/jenis-prestasi',        'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.kategori-prestasi',  'label' => 'Kategori Prestasi',   'group' => 'Wakasis', 'icon' => 'Medal',          'route' => '/wakasis/kategori-prestasi',     'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.kategori-pembinaan', 'label' => 'Kategori Pembinaan',  'group' => 'Wakasis', 'icon' => 'HeartHandshake', 'route' => '/wakasis/kategori-pembinaan',    'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.jenis-sp',           'label' => 'Jenis SP',            'group' => 'Wakasis', 'icon' => 'FileWarning',    'route' => '/wakasis/jenis-sp',              'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.pelanggaran',        'label' => 'Pelanggaran',         'group' => 'Wakasis', 'icon' => 'ShieldX',        'route' => '/wakasis/pelanggaran',           'type' => 'custom', 'actions' => ['view', 'create', 'update', 'delete', 'validate'], 'sidebar' => true],
    ['key' => 'wakasis.surat-peringatan',   'label' => 'Surat Peringatan',    'group' => 'Wakasis', 'icon' => 'Mail',           'route' => '/wakasis/surat-peringatan',      'type' => 'custom', 'actions' => ['view', 'validate'],                              'sidebar' => true],
    ['key' => 'wakasis.pembinaan',          'label' => 'Pembinaan',           'group' => 'Wakasis', 'icon' => 'UserCog',        'route' => '/wakasis/pembinaan',             'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.prestasi',           'label' => 'Prestasi Siswa',      'group' => 'Wakasis', 'icon' => 'Trophy',         'route' => '/wakasis/prestasi',              'type' => 'custom', 'actions' => ['view', 'create', 'update', 'delete', 'validate'], 'sidebar' => true],
    ['key' => 'wakasis.kasus-siswa',        'label' => 'Kasus Siswa',         'group' => 'Wakasis', 'icon' => 'ClipboardX',     'route' => '/wakasis/kasus-siswa',           'type' => 'crud',   'actions' => null,                                              'sidebar' => true],
    ['key' => 'wakasis.student-timeline',   'label' => 'Student Timeline',    'group' => 'Wakasis', 'icon' => 'History',        'route' => '/wakasis/student-timeline',      'type' => 'custom', 'actions' => ['view'],                                          'sidebar' => true],
    ['key' => 'wakasis.laporan',            'label' => 'Laporan Wakasis',     'group' => 'Wakasis', 'icon' => 'FileText',       'route' => '/wakasis/laporan',               'type' => 'custom', 'actions' => ['view', 'export'],                                'sidebar' => true],
];
