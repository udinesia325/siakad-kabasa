import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:22
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
* @see app/Http/Controllers/StatistikAbsensiController.php:22
* @route '/statistik-absensi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:22
* @route '/statistik-absensi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatistikAbsensiController::index
* @see app/Http/Controllers/StatistikAbsensiController.php:22
* @route '/statistik-absensi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:47
* @route '/statistik-absensi/{kelasAjaran}'
*/
export const show = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/statistik-absensi/{kelasAjaran}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:47
* @route '/statistik-absensi/{kelasAjaran}'
*/
show.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelasAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelasAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
    }

    return show.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:47
* @route '/statistik-absensi/{kelasAjaran}'
*/
show.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\StatistikAbsensiController::show
* @see app/Http/Controllers/StatistikAbsensiController.php:47
* @route '/statistik-absensi/{kelasAjaran}'
*/
show.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const statistikAbsensi = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default statistikAbsensi