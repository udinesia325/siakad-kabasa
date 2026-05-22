import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AbsensiController::index
* @see app/Http/Controllers/AbsensiController.php:18
* @route '/absensi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/absensi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AbsensiController::index
* @see app/Http/Controllers/AbsensiController.php:18
* @route '/absensi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AbsensiController::index
* @see app/Http/Controllers/AbsensiController.php:18
* @route '/absensi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AbsensiController::index
* @see app/Http/Controllers/AbsensiController.php:18
* @route '/absensi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AbsensiController::scan
* @see app/Http/Controllers/AbsensiController.php:33
* @route '/api/absensi/scan'
*/
export const scan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scan.url(options),
    method: 'post',
})

scan.definition = {
    methods: ["post"],
    url: '/api/absensi/scan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AbsensiController::scan
* @see app/Http/Controllers/AbsensiController.php:33
* @route '/api/absensi/scan'
*/
scan.url = (options?: RouteQueryOptions) => {
    return scan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AbsensiController::scan
* @see app/Http/Controllers/AbsensiController.php:33
* @route '/api/absensi/scan'
*/
scan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scan.url(options),
    method: 'post',
})

const AbsensiController = { index, scan }

export default AbsensiController