import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalAbsensiController::index
* @see app/Http/Controllers/JadwalAbsensiController.php:15
* @route '/jadwal-absensi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal-absensi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalAbsensiController::index
* @see app/Http/Controllers/JadwalAbsensiController.php:15
* @route '/jadwal-absensi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalAbsensiController::index
* @see app/Http/Controllers/JadwalAbsensiController.php:15
* @route '/jadwal-absensi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalAbsensiController::index
* @see app/Http/Controllers/JadwalAbsensiController.php:15
* @route '/jadwal-absensi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalAbsensiController::update
* @see app/Http/Controllers/JadwalAbsensiController.php:22
* @route '/jadwal-absensi/{jadwalAbsensi}'
*/
export const update = (args: { jadwalAbsensi: number | { id: number } } | [jadwalAbsensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/jadwal-absensi/{jadwalAbsensi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\JadwalAbsensiController::update
* @see app/Http/Controllers/JadwalAbsensiController.php:22
* @route '/jadwal-absensi/{jadwalAbsensi}'
*/
update.url = (args: { jadwalAbsensi: number | { id: number } } | [jadwalAbsensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalAbsensi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jadwalAbsensi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jadwalAbsensi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jadwalAbsensi: typeof args.jadwalAbsensi === 'object'
        ? args.jadwalAbsensi.id
        : args.jadwalAbsensi,
    }

    return update.definition.url
            .replace('{jadwalAbsensi}', parsedArgs.jadwalAbsensi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalAbsensiController::update
* @see app/Http/Controllers/JadwalAbsensiController.php:22
* @route '/jadwal-absensi/{jadwalAbsensi}'
*/
update.patch = (args: { jadwalAbsensi: number | { id: number } } | [jadwalAbsensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const jadwalAbsensi = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
}

export default jadwalAbsensi