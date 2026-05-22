import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JadwalMengajarController::index
* @see app/Http/Controllers/JadwalMengajarController.php:20
* @route '/jadwal-mengajar'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal-mengajar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::index
* @see app/Http/Controllers/JadwalMengajarController.php:20
* @route '/jadwal-mengajar'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalMengajarController::index
* @see app/Http/Controllers/JadwalMengajarController.php:20
* @route '/jadwal-mengajar'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::index
* @see app/Http/Controllers/JadwalMengajarController.php:20
* @route '/jadwal-mengajar'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:32
* @route '/jadwal-mengajar/{kelas}'
*/
export const show = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/jadwal-mengajar/{kelas}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:32
* @route '/jadwal-mengajar/{kelas}'
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
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:32
* @route '/jadwal-mengajar/{kelas}'
*/
show.get = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:32
* @route '/jadwal-mengajar/{kelas}'
*/
show.head = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::store
* @see app/Http/Controllers/JadwalMengajarController.php:73
* @route '/jadwal-mengajar/{kelas}'
*/
export const store = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jadwal-mengajar/{kelas}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::store
* @see app/Http/Controllers/JadwalMengajarController.php:73
* @route '/jadwal-mengajar/{kelas}'
*/
store.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalMengajarController::store
* @see app/Http/Controllers/JadwalMengajarController.php:73
* @route '/jadwal-mengajar/{kelas}'
*/
store.post = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::destroy
* @see app/Http/Controllers/JadwalMengajarController.php:106
* @route '/jadwal-mengajar/{kelas}/{jadwal}'
*/
export const destroy = (args: { kelas: number | { id: number }, jadwal: number | { id: number } } | [kelas: number | { id: number }, jadwal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jadwal-mengajar/{kelas}/{jadwal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::destroy
* @see app/Http/Controllers/JadwalMengajarController.php:106
* @route '/jadwal-mengajar/{kelas}/{jadwal}'
*/
destroy.url = (args: { kelas: number | { id: number }, jadwal: number | { id: number } } | [kelas: number | { id: number }, jadwal: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kelas: args[0],
            jadwal: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelas: typeof args.kelas === 'object'
        ? args.kelas.id
        : args.kelas,
        jadwal: typeof args.jadwal === 'object'
        ? args.jadwal.id
        : args.jadwal,
    }

    return destroy.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace('{jadwal}', parsedArgs.jadwal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalMengajarController::destroy
* @see app/Http/Controllers/JadwalMengajarController.php:106
* @route '/jadwal-mengajar/{kelas}/{jadwal}'
*/
destroy.delete = (args: { kelas: number | { id: number }, jadwal: number | { id: number } } | [kelas: number | { id: number }, jadwal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const JadwalMengajarController = { index, show, store, destroy }

export default JadwalMengajarController