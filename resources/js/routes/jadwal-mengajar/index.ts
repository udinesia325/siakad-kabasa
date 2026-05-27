import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
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
* @see app/Http/Controllers/JadwalMengajarController.php:42
* @route '/jadwal-mengajar/{kelasAjaran}'
*/
export const show = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/jadwal-mengajar/{kelasAjaran}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:42
* @route '/jadwal-mengajar/{kelasAjaran}'
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
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:42
* @route '/jadwal-mengajar/{kelasAjaran}'
*/
show.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::show
* @see app/Http/Controllers/JadwalMengajarController.php:42
* @route '/jadwal-mengajar/{kelasAjaran}'
*/
show.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::store
* @see app/Http/Controllers/JadwalMengajarController.php:93
* @route '/jadwal-mengajar/{kelasAjaran}'
*/
export const store = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jadwal-mengajar/{kelasAjaran}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::store
* @see app/Http/Controllers/JadwalMengajarController.php:93
* @route '/jadwal-mengajar/{kelasAjaran}'
*/
store.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalMengajarController::store
* @see app/Http/Controllers/JadwalMengajarController.php:93
* @route '/jadwal-mengajar/{kelasAjaran}'
*/
store.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JadwalMengajarController::destroy
* @see app/Http/Controllers/JadwalMengajarController.php:126
* @route '/jadwal-mengajar/{kelasAjaran}/{jadwal}'
*/
export const destroy = (args: { kelasAjaran: number | { id: number }, jadwal: number | { id: number } } | [kelasAjaran: number | { id: number }, jadwal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jadwal-mengajar/{kelasAjaran}/{jadwal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JadwalMengajarController::destroy
* @see app/Http/Controllers/JadwalMengajarController.php:126
* @route '/jadwal-mengajar/{kelasAjaran}/{jadwal}'
*/
destroy.url = (args: { kelasAjaran: number | { id: number }, jadwal: number | { id: number } } | [kelasAjaran: number | { id: number }, jadwal: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
            jadwal: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
        jadwal: typeof args.jadwal === 'object'
        ? args.jadwal.id
        : args.jadwal,
    }

    return destroy.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace('{jadwal}', parsedArgs.jadwal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JadwalMengajarController::destroy
* @see app/Http/Controllers/JadwalMengajarController.php:126
* @route '/jadwal-mengajar/{kelasAjaran}/{jadwal}'
*/
destroy.delete = (args: { kelasAjaran: number | { id: number }, jadwal: number | { id: number } } | [kelasAjaran: number | { id: number }, jadwal: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const jadwalMengajar = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
}

export default jadwalMengajar