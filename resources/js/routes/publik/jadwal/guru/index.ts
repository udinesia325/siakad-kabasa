import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal/guru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
export const show = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/jadwal/guru/{pegawai}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
show.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return show.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
show.get = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::show
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
show.head = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const guru = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default guru