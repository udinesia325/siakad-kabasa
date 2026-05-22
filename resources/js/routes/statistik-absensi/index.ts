import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:21
* @route '/statistik-absensi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/statistik-absensi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:21
* @route '/statistik-absensi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:21
* @route '/statistik-absensi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:21
* @route '/statistik-absensi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:35
* @route '/statistik-absensi/{kelas}'
*/
export const show = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/statistik-absensi/{kelas}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:35
* @route '/statistik-absensi/{kelas}'
*/
show.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelas: typeof args.kelas === 'object'
        ? args.kelas.id
        : args.kelas,
    }

    return show.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:35
* @route '/statistik-absensi/{kelas}'
*/
show.get = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:35
* @route '/statistik-absensi/{kelas}'
*/
show.head = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const statistikAbsensi = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default statistikAbsensi