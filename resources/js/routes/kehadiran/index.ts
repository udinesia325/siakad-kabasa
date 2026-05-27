import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kehadiran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KehadiranController::index
* @see app/Http/Controllers/KehadiranController.php:30
* @route '/kehadiran'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
*/
export const show = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/kehadiran/{kelasAjaran}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
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
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
*/
show.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
*/
show.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
*/
const showForm = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
*/
showForm.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KehadiranController::show
* @see app/Http/Controllers/KehadiranController.php:77
* @route '/kehadiran/{kelasAjaran}'
*/
showForm.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\KehadiranController::anulir
* @see app/Http/Controllers/KehadiranController.php:262
* @route '/kehadiran/{kelasAjaran}/anulir'
*/
export const anulir = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: anulir.url(args, options),
    method: 'post',
})

anulir.definition = {
    methods: ["post"],
    url: '/kehadiran/{kelasAjaran}/anulir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KehadiranController::anulir
* @see app/Http/Controllers/KehadiranController.php:262
* @route '/kehadiran/{kelasAjaran}/anulir'
*/
anulir.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return anulir.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KehadiranController::anulir
* @see app/Http/Controllers/KehadiranController.php:262
* @route '/kehadiran/{kelasAjaran}/anulir'
*/
anulir.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: anulir.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KehadiranController::anulir
* @see app/Http/Controllers/KehadiranController.php:262
* @route '/kehadiran/{kelasAjaran}/anulir'
*/
const anulirForm = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: anulir.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KehadiranController::anulir
* @see app/Http/Controllers/KehadiranController.php:262
* @route '/kehadiran/{kelasAjaran}/anulir'
*/
anulirForm.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: anulir.url(args, options),
    method: 'post',
})

anulir.form = anulirForm

const kehadiran = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    anulir: Object.assign(anulir, anulir),
}

export default kehadiran