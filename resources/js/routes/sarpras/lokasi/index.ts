import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/lokasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::index
* @see app/Http/Controllers/Sarpras/LokasiController.php:15
* @route '/sarpras/lokasi'
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
* @see \App\Http\Controllers\Sarpras\LokasiController::store
* @see app/Http/Controllers/Sarpras/LokasiController.php:37
* @route '/sarpras/lokasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/lokasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::store
* @see app/Http/Controllers/Sarpras/LokasiController.php:37
* @route '/sarpras/lokasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::store
* @see app/Http/Controllers/Sarpras/LokasiController.php:37
* @route '/sarpras/lokasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::store
* @see app/Http/Controllers/Sarpras/LokasiController.php:37
* @route '/sarpras/lokasi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::store
* @see app/Http/Controllers/Sarpras/LokasiController.php:37
* @route '/sarpras/lokasi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::update
* @see app/Http/Controllers/Sarpras/LokasiController.php:53
* @route '/sarpras/lokasi/{lokasi}'
*/
export const update = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/sarpras/lokasi/{lokasi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::update
* @see app/Http/Controllers/Sarpras/LokasiController.php:53
* @route '/sarpras/lokasi/{lokasi}'
*/
update.url = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lokasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lokasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lokasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lokasi: typeof args.lokasi === 'object'
        ? args.lokasi.id
        : args.lokasi,
    }

    return update.definition.url
            .replace('{lokasi}', parsedArgs.lokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::update
* @see app/Http/Controllers/Sarpras/LokasiController.php:53
* @route '/sarpras/lokasi/{lokasi}'
*/
update.patch = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::update
* @see app/Http/Controllers/Sarpras/LokasiController.php:53
* @route '/sarpras/lokasi/{lokasi}'
*/
const updateForm = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::update
* @see app/Http/Controllers/Sarpras/LokasiController.php:53
* @route '/sarpras/lokasi/{lokasi}'
*/
updateForm.patch = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Sarpras\LokasiController::destroy
* @see app/Http/Controllers/Sarpras/LokasiController.php:69
* @route '/sarpras/lokasi/{lokasi}'
*/
export const destroy = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/lokasi/{lokasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::destroy
* @see app/Http/Controllers/Sarpras/LokasiController.php:69
* @route '/sarpras/lokasi/{lokasi}'
*/
destroy.url = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lokasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lokasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lokasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lokasi: typeof args.lokasi === 'object'
        ? args.lokasi.id
        : args.lokasi,
    }

    return destroy.definition.url
            .replace('{lokasi}', parsedArgs.lokasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::destroy
* @see app/Http/Controllers/Sarpras/LokasiController.php:69
* @route '/sarpras/lokasi/{lokasi}'
*/
destroy.delete = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::destroy
* @see app/Http/Controllers/Sarpras/LokasiController.php:69
* @route '/sarpras/lokasi/{lokasi}'
*/
const destroyForm = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\LokasiController::destroy
* @see app/Http/Controllers/Sarpras/LokasiController.php:69
* @route '/sarpras/lokasi/{lokasi}'
*/
destroyForm.delete = (args: { lokasi: number | { id: number } } | [lokasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const lokasi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default lokasi