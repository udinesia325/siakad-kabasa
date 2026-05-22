import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/vendor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
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
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/vendor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
export const update = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/sarpras/vendor/{vendor}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
update.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return update.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
update.patch = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
const updateForm = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
updateForm.patch = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
export const destroy = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/vendor/{vendor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
destroy.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return destroy.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
destroy.delete = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
const destroyForm = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
destroyForm.delete = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const vendor = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default vendor