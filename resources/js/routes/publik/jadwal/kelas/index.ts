import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal/kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:46
* @route '/jadwal/kelas/{kelasAjaran}'
*/
export const show = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/jadwal/kelas/{kelasAjaran}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:46
* @route '/jadwal/kelas/{kelasAjaran}'
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
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:46
* @route '/jadwal/kelas/{kelasAjaran}'
*/
show.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:46
* @route '/jadwal/kelas/{kelasAjaran}'
*/
show.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const kelas = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default kelas