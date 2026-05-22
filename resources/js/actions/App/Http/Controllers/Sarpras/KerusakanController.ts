import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::index
* @see app/Http/Controllers/Sarpras/KerusakanController.php:19
* @route '/sarpras/kerusakan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/kerusakan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::index
* @see app/Http/Controllers/Sarpras/KerusakanController.php:19
* @route '/sarpras/kerusakan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::index
* @see app/Http/Controllers/Sarpras/KerusakanController.php:19
* @route '/sarpras/kerusakan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::index
* @see app/Http/Controllers/Sarpras/KerusakanController.php:19
* @route '/sarpras/kerusakan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::store
* @see app/Http/Controllers/Sarpras/KerusakanController.php:49
* @route '/sarpras/kerusakan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/kerusakan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::store
* @see app/Http/Controllers/Sarpras/KerusakanController.php:49
* @route '/sarpras/kerusakan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::store
* @see app/Http/Controllers/Sarpras/KerusakanController.php:49
* @route '/sarpras/kerusakan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::update
* @see app/Http/Controllers/Sarpras/KerusakanController.php:72
* @route '/sarpras/kerusakan/{kerusakan}'
*/
const updateb4d0eeaf76c8c0c22db7c15d5307dfb2 = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb4d0eeaf76c8c0c22db7c15d5307dfb2.url(args, options),
    method: 'put',
})

updateb4d0eeaf76c8c0c22db7c15d5307dfb2.definition = {
    methods: ["put"],
    url: '/sarpras/kerusakan/{kerusakan}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::update
* @see app/Http/Controllers/Sarpras/KerusakanController.php:72
* @route '/sarpras/kerusakan/{kerusakan}'
*/
updateb4d0eeaf76c8c0c22db7c15d5307dfb2.url = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kerusakan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kerusakan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kerusakan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kerusakan: typeof args.kerusakan === 'object'
        ? args.kerusakan.id
        : args.kerusakan,
    }

    return updateb4d0eeaf76c8c0c22db7c15d5307dfb2.definition.url
            .replace('{kerusakan}', parsedArgs.kerusakan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::update
* @see app/Http/Controllers/Sarpras/KerusakanController.php:72
* @route '/sarpras/kerusakan/{kerusakan}'
*/
updateb4d0eeaf76c8c0c22db7c15d5307dfb2.put = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateb4d0eeaf76c8c0c22db7c15d5307dfb2.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::update
* @see app/Http/Controllers/Sarpras/KerusakanController.php:72
* @route '/sarpras/kerusakan/{kerusakan}'
*/
const updateb4d0eeaf76c8c0c22db7c15d5307dfb2 = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb4d0eeaf76c8c0c22db7c15d5307dfb2.url(args, options),
    method: 'patch',
})

updateb4d0eeaf76c8c0c22db7c15d5307dfb2.definition = {
    methods: ["patch"],
    url: '/sarpras/kerusakan/{kerusakan}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::update
* @see app/Http/Controllers/Sarpras/KerusakanController.php:72
* @route '/sarpras/kerusakan/{kerusakan}'
*/
updateb4d0eeaf76c8c0c22db7c15d5307dfb2.url = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kerusakan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kerusakan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kerusakan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kerusakan: typeof args.kerusakan === 'object'
        ? args.kerusakan.id
        : args.kerusakan,
    }

    return updateb4d0eeaf76c8c0c22db7c15d5307dfb2.definition.url
            .replace('{kerusakan}', parsedArgs.kerusakan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::update
* @see app/Http/Controllers/Sarpras/KerusakanController.php:72
* @route '/sarpras/kerusakan/{kerusakan}'
*/
updateb4d0eeaf76c8c0c22db7c15d5307dfb2.patch = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateb4d0eeaf76c8c0c22db7c15d5307dfb2.url(args, options),
    method: 'patch',
})

export const update = {
    '/sarpras/kerusakan/{kerusakan}': updateb4d0eeaf76c8c0c22db7c15d5307dfb2,
    '/sarpras/kerusakan/{kerusakan}': updateb4d0eeaf76c8c0c22db7c15d5307dfb2,
}

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::destroy
* @see app/Http/Controllers/Sarpras/KerusakanController.php:97
* @route '/sarpras/kerusakan/{kerusakan}'
*/
export const destroy = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/kerusakan/{kerusakan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::destroy
* @see app/Http/Controllers/Sarpras/KerusakanController.php:97
* @route '/sarpras/kerusakan/{kerusakan}'
*/
destroy.url = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kerusakan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kerusakan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kerusakan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kerusakan: typeof args.kerusakan === 'object'
        ? args.kerusakan.id
        : args.kerusakan,
    }

    return destroy.definition.url
            .replace('{kerusakan}', parsedArgs.kerusakan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KerusakanController::destroy
* @see app/Http/Controllers/Sarpras/KerusakanController.php:97
* @route '/sarpras/kerusakan/{kerusakan}'
*/
destroy.delete = (args: { kerusakan: number | { id: number } } | [kerusakan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const KerusakanController = { index, store, update, destroy }

export default KerusakanController