import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\LaporanController::index
* @see app/Http/Controllers/Wakasis/LaporanController.php:20
* @route '/wakasis/laporan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/laporan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::index
* @see app/Http/Controllers/Wakasis/LaporanController.php:20
* @route '/wakasis/laporan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::index
* @see app/Http/Controllers/Wakasis/LaporanController.php:20
* @route '/wakasis/laporan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::index
* @see app/Http/Controllers/Wakasis/LaporanController.php:20
* @route '/wakasis/laporan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::exportMethod
* @see app/Http/Controllers/Wakasis/LaporanController.php:57
* @route '/wakasis/laporan/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/wakasis/laporan/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::exportMethod
* @see app/Http/Controllers/Wakasis/LaporanController.php:57
* @route '/wakasis/laporan/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::exportMethod
* @see app/Http/Controllers/Wakasis/LaporanController.php:57
* @route '/wakasis/laporan/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\LaporanController::exportMethod
* @see app/Http/Controllers/Wakasis/LaporanController.php:57
* @route '/wakasis/laporan/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

const laporan = {
    index: Object.assign(index, index),
    export: Object.assign(exportMethod, exportMethod),
}

export default laporan