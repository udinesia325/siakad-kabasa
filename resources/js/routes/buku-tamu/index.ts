import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buku-tamu',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BukuTamuController::store
* @see app/Http/Controllers/BukuTamuController.php:40
* @route '/buku-tamu'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/buku-tamu',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BukuTamuController::store
* @see app/Http/Controllers/BukuTamuController.php:40
* @route '/buku-tamu'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BukuTamuController::store
* @see app/Http/Controllers/BukuTamuController.php:40
* @route '/buku-tamu'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
export const update = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/buku-tamu/{bukuTamu}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
update.url = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bukuTamu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bukuTamu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bukuTamu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bukuTamu: typeof args.bukuTamu === 'object'
        ? args.bukuTamu.id
        : args.bukuTamu,
    }

    return update.definition.url
            .replace('{bukuTamu}', parsedArgs.bukuTamu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
update.patch = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BukuTamuController::destroy
* @see app/Http/Controllers/BukuTamuController.php:80
* @route '/buku-tamu/{bukuTamu}'
*/
export const destroy = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/buku-tamu/{bukuTamu}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BukuTamuController::destroy
* @see app/Http/Controllers/BukuTamuController.php:80
* @route '/buku-tamu/{bukuTamu}'
*/
destroy.url = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bukuTamu: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bukuTamu: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bukuTamu: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bukuTamu: typeof args.bukuTamu === 'object'
        ? args.bukuTamu.id
        : args.bukuTamu,
    }

    return destroy.definition.url
            .replace('{bukuTamu}', parsedArgs.bukuTamu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BukuTamuController::destroy
* @see app/Http/Controllers/BukuTamuController.php:80
* @route '/buku-tamu/{bukuTamu}'
*/
destroy.delete = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const bukuTamu = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default bukuTamu