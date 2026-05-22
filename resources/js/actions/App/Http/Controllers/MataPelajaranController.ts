import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MataPelajaranController::index
* @see app/Http/Controllers/MataPelajaranController.php:14
* @route '/mata-pelajaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/mata-pelajaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MataPelajaranController::index
* @see app/Http/Controllers/MataPelajaranController.php:14
* @route '/mata-pelajaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MataPelajaranController::index
* @see app/Http/Controllers/MataPelajaranController.php:14
* @route '/mata-pelajaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MataPelajaranController::index
* @see app/Http/Controllers/MataPelajaranController.php:14
* @route '/mata-pelajaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MataPelajaranController::store
* @see app/Http/Controllers/MataPelajaranController.php:41
* @route '/mata-pelajaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mata-pelajaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MataPelajaranController::store
* @see app/Http/Controllers/MataPelajaranController.php:41
* @route '/mata-pelajaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MataPelajaranController::store
* @see app/Http/Controllers/MataPelajaranController.php:41
* @route '/mata-pelajaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MataPelajaranController::update
* @see app/Http/Controllers/MataPelajaranController.php:58
* @route '/mata-pelajaran/{mataPelajaran}'
*/
const updated8346be4367f2681e04e7a80495dfa2d = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated8346be4367f2681e04e7a80495dfa2d.url(args, options),
    method: 'put',
})

updated8346be4367f2681e04e7a80495dfa2d.definition = {
    methods: ["put"],
    url: '/mata-pelajaran/{mataPelajaran}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\MataPelajaranController::update
* @see app/Http/Controllers/MataPelajaranController.php:58
* @route '/mata-pelajaran/{mataPelajaran}'
*/
updated8346be4367f2681e04e7a80495dfa2d.url = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mataPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { mataPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            mataPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        mataPelajaran: typeof args.mataPelajaran === 'object'
        ? args.mataPelajaran.id
        : args.mataPelajaran,
    }

    return updated8346be4367f2681e04e7a80495dfa2d.definition.url
            .replace('{mataPelajaran}', parsedArgs.mataPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MataPelajaranController::update
* @see app/Http/Controllers/MataPelajaranController.php:58
* @route '/mata-pelajaran/{mataPelajaran}'
*/
updated8346be4367f2681e04e7a80495dfa2d.put = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated8346be4367f2681e04e7a80495dfa2d.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\MataPelajaranController::update
* @see app/Http/Controllers/MataPelajaranController.php:58
* @route '/mata-pelajaran/{mataPelajaran}'
*/
const updated8346be4367f2681e04e7a80495dfa2d = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated8346be4367f2681e04e7a80495dfa2d.url(args, options),
    method: 'patch',
})

updated8346be4367f2681e04e7a80495dfa2d.definition = {
    methods: ["patch"],
    url: '/mata-pelajaran/{mataPelajaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MataPelajaranController::update
* @see app/Http/Controllers/MataPelajaranController.php:58
* @route '/mata-pelajaran/{mataPelajaran}'
*/
updated8346be4367f2681e04e7a80495dfa2d.url = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mataPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { mataPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            mataPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        mataPelajaran: typeof args.mataPelajaran === 'object'
        ? args.mataPelajaran.id
        : args.mataPelajaran,
    }

    return updated8346be4367f2681e04e7a80495dfa2d.definition.url
            .replace('{mataPelajaran}', parsedArgs.mataPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MataPelajaranController::update
* @see app/Http/Controllers/MataPelajaranController.php:58
* @route '/mata-pelajaran/{mataPelajaran}'
*/
updated8346be4367f2681e04e7a80495dfa2d.patch = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated8346be4367f2681e04e7a80495dfa2d.url(args, options),
    method: 'patch',
})

export const update = {
    '/mata-pelajaran/{mataPelajaran}': updated8346be4367f2681e04e7a80495dfa2d,
    '/mata-pelajaran/{mataPelajaran}': updated8346be4367f2681e04e7a80495dfa2d,
}

/**
* @see \App\Http\Controllers\MataPelajaranController::syncPengampu
* @see app/Http/Controllers/MataPelajaranController.php:84
* @route '/mata-pelajaran/{mataPelajaran}/pengampu'
*/
export const syncPengampu = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncPengampu.url(args, options),
    method: 'post',
})

syncPengampu.definition = {
    methods: ["post"],
    url: '/mata-pelajaran/{mataPelajaran}/pengampu',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MataPelajaranController::syncPengampu
* @see app/Http/Controllers/MataPelajaranController.php:84
* @route '/mata-pelajaran/{mataPelajaran}/pengampu'
*/
syncPengampu.url = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mataPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { mataPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            mataPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        mataPelajaran: typeof args.mataPelajaran === 'object'
        ? args.mataPelajaran.id
        : args.mataPelajaran,
    }

    return syncPengampu.definition.url
            .replace('{mataPelajaran}', parsedArgs.mataPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MataPelajaranController::syncPengampu
* @see app/Http/Controllers/MataPelajaranController.php:84
* @route '/mata-pelajaran/{mataPelajaran}/pengampu'
*/
syncPengampu.post = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncPengampu.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MataPelajaranController::destroy
* @see app/Http/Controllers/MataPelajaranController.php:75
* @route '/mata-pelajaran/{mataPelajaran}'
*/
export const destroy = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mata-pelajaran/{mataPelajaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MataPelajaranController::destroy
* @see app/Http/Controllers/MataPelajaranController.php:75
* @route '/mata-pelajaran/{mataPelajaran}'
*/
destroy.url = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { mataPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { mataPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            mataPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        mataPelajaran: typeof args.mataPelajaran === 'object'
        ? args.mataPelajaran.id
        : args.mataPelajaran,
    }

    return destroy.definition.url
            .replace('{mataPelajaran}', parsedArgs.mataPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MataPelajaranController::destroy
* @see app/Http/Controllers/MataPelajaranController.php:75
* @route '/mata-pelajaran/{mataPelajaran}'
*/
destroy.delete = (args: { mataPelajaran: number | { id: number } } | [mataPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const MataPelajaranController = { index, store, update, syncPengampu, destroy }

export default MataPelajaranController