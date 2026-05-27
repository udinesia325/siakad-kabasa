import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import jenisPelanggaran from './jenis-pelanggaran'
import poinPelanggaran from './poin-pelanggaran'
import jenisPrestasi from './jenis-prestasi'
import kategoriPrestasi from './kategori-prestasi'
import kategoriPembinaan from './kategori-pembinaan'
import jenisSp from './jenis-sp'
import pelanggaran from './pelanggaran'
import suratPeringatan from './surat-peringatan'
import pembinaan from './pembinaan'
import prestasi from './prestasi'
import kasusSiswa from './kasus-siswa'
import laporan from './laporan'
import studentTimeline from './student-timeline'
/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/wakasis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const wakasis = {
    dashboard: Object.assign(dashboard, dashboard),
    jenisPelanggaran: Object.assign(jenisPelanggaran, jenisPelanggaran),
    poinPelanggaran: Object.assign(poinPelanggaran, poinPelanggaran),
    jenisPrestasi: Object.assign(jenisPrestasi, jenisPrestasi),
    kategoriPrestasi: Object.assign(kategoriPrestasi, kategoriPrestasi),
    kategoriPembinaan: Object.assign(kategoriPembinaan, kategoriPembinaan),
    jenisSp: Object.assign(jenisSp, jenisSp),
    pelanggaran: Object.assign(pelanggaran, pelanggaran),
    suratPeringatan: Object.assign(suratPeringatan, suratPeringatan),
    pembinaan: Object.assign(pembinaan, pembinaan),
    prestasi: Object.assign(prestasi, prestasi),
    kasusSiswa: Object.assign(kasusSiswa, kasusSiswa),
    laporan: Object.assign(laporan, laporan),
    studentTimeline: Object.assign(studentTimeline, studentTimeline),
}

export default wakasis