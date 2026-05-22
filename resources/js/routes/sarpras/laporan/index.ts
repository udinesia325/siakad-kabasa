import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import exportMethod from './export'
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

const laporan = {
    index: Object.assign(index, index),
    export: Object.assign(exportMethod, exportMethod),
}

export default laporan