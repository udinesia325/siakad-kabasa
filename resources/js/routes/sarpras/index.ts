import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import kategori from './kategori'
import lokasi from './lokasi'
import vendor from './vendor'
import barang from './barang'
import peminjaman from './peminjaman'
import bookingRuangan from './booking-ruangan'
import kerusakan from './kerusakan'
import maintenance from './maintenance'
import laporan from './laporan'
/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/sarpras',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

const sarpras = {
    dashboard: Object.assign(dashboard, dashboard),
    kategori: Object.assign(kategori, kategori),
    lokasi: Object.assign(lokasi, lokasi),
    vendor: Object.assign(vendor, vendor),
    barang: Object.assign(barang, barang),
    peminjaman: Object.assign(peminjaman, peminjaman),
    bookingRuangan: Object.assign(bookingRuangan, bookingRuangan),
    kerusakan: Object.assign(kerusakan, kerusakan),
    maintenance: Object.assign(maintenance, maintenance),
    laporan: Object.assign(laporan, laporan),
}

export default sarpras