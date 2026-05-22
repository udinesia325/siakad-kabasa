import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BukuTamuController::index
* @see app/Http/Controllers/BukuTamuController.php:14
* @route '/buku-tamu'
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
* @see \App\Http\Controllers\BukuTamuController::store
* @see app/Http/Controllers/BukuTamuController.php:40
* @route '/buku-tamu'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BukuTamuController::store
* @see app/Http/Controllers/BukuTamuController.php:40
* @route '/buku-tamu'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
const updateecbcd5db8290e17012fbaa5945feb959 = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateecbcd5db8290e17012fbaa5945feb959.url(args, options),
    method: 'put',
})

updateecbcd5db8290e17012fbaa5945feb959.definition = {
    methods: ["put"],
    url: '/buku-tamu/{bukuTamu}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
updateecbcd5db8290e17012fbaa5945feb959.url = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateecbcd5db8290e17012fbaa5945feb959.definition.url
            .replace('{bukuTamu}', parsedArgs.bukuTamu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
updateecbcd5db8290e17012fbaa5945feb959.put = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateecbcd5db8290e17012fbaa5945feb959.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
const updateecbcd5db8290e17012fbaa5945feb959Form = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateecbcd5db8290e17012fbaa5945feb959.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
updateecbcd5db8290e17012fbaa5945feb959Form.put = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateecbcd5db8290e17012fbaa5945feb959.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateecbcd5db8290e17012fbaa5945feb959.form = updateecbcd5db8290e17012fbaa5945feb959Form
/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
const updateecbcd5db8290e17012fbaa5945feb959 = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateecbcd5db8290e17012fbaa5945feb959.url(args, options),
    method: 'patch',
})

updateecbcd5db8290e17012fbaa5945feb959.definition = {
    methods: ["patch"],
    url: '/buku-tamu/{bukuTamu}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
updateecbcd5db8290e17012fbaa5945feb959.url = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateecbcd5db8290e17012fbaa5945feb959.definition.url
            .replace('{bukuTamu}', parsedArgs.bukuTamu.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
updateecbcd5db8290e17012fbaa5945feb959.patch = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateecbcd5db8290e17012fbaa5945feb959.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
const updateecbcd5db8290e17012fbaa5945feb959Form = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateecbcd5db8290e17012fbaa5945feb959.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BukuTamuController::update
* @see app/Http/Controllers/BukuTamuController.php:61
* @route '/buku-tamu/{bukuTamu}'
*/
updateecbcd5db8290e17012fbaa5945feb959Form.patch = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateecbcd5db8290e17012fbaa5945feb959.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateecbcd5db8290e17012fbaa5945feb959.form = updateecbcd5db8290e17012fbaa5945feb959Form

export const update = {
    '/buku-tamu/{bukuTamu}': updateecbcd5db8290e17012fbaa5945feb959,
    '/buku-tamu/{bukuTamu}': updateecbcd5db8290e17012fbaa5945feb959,
}

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

/**
* @see \App\Http\Controllers\BukuTamuController::destroy
* @see app/Http/Controllers/BukuTamuController.php:80
* @route '/buku-tamu/{bukuTamu}'
*/
const destroyForm = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BukuTamuController::destroy
* @see app/Http/Controllers/BukuTamuController.php:80
* @route '/buku-tamu/{bukuTamu}'
*/
destroyForm.delete = (args: { bukuTamu: number | { id: number } } | [bukuTamu: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const BukuTamuController = { index, store, update, destroy }

export default BukuTamuController