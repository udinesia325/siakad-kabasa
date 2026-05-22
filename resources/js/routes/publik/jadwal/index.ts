import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import kelas from './kelas'
import guru from './guru'
/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const jadwal = {
    index: Object.assign(index, index),
    kelas: Object.assign(kelas, kelas),
    guru: Object.assign(guru, guru),
}

export default jadwal