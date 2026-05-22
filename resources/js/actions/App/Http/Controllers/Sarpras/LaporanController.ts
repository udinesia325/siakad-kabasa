import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\LaporanController::index
* @see app/Http/Controllers/Sarpras/LaporanController.php:24
* @route '/sarpras/laporan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/laporan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::index
* @see app/Http/Controllers/Sarpras/LaporanController.php:24
* @route '/sarpras/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::index
* @see app/Http/Controllers/Sarpras/LaporanController.php:24
* @route '/sarpras/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::index
* @see app/Http/Controllers/Sarpras/LaporanController.php:24
* @route '/sarpras/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportExcel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/sarpras/laporan/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportExcel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportExcel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportExcel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportPdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/sarpras/laporan/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportPdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportPdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::exportPdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

const LaporanController = { index, exportExcel, exportPdf }

export default LaporanController