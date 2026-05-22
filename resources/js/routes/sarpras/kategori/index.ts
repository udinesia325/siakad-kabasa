import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/kategori',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::index
* @see app/Http/Controllers/Sarpras/KategoriController.php:14
* @route '/sarpras/kategori'
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
* @see \App\Http\Controllers\Sarpras\KategoriController::store
* @see app/Http/Controllers/Sarpras/KategoriController.php:28
* @route '/sarpras/kategori'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/kategori',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::store
* @see app/Http/Controllers/Sarpras/KategoriController.php:28
* @route '/sarpras/kategori'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::store
* @see app/Http/Controllers/Sarpras/KategoriController.php:28
* @route '/sarpras/kategori'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::store
* @see app/Http/Controllers/Sarpras/KategoriController.php:28
* @route '/sarpras/kategori'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::store
* @see app/Http/Controllers/Sarpras/KategoriController.php:28
* @route '/sarpras/kategori'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::update
* @see app/Http/Controllers/Sarpras/KategoriController.php:43
* @route '/sarpras/kategori/{kategori}'
*/
export const update = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/sarpras/kategori/{kategori}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::update
* @see app/Http/Controllers/Sarpras/KategoriController.php:43
* @route '/sarpras/kategori/{kategori}'
*/
update.url = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategori: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategori: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategori: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategori: typeof args.kategori === 'object'
        ? args.kategori.id
        : args.kategori,
    }

    return update.definition.url
            .replace('{kategori}', parsedArgs.kategori.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::update
* @see app/Http/Controllers/Sarpras/KategoriController.php:43
* @route '/sarpras/kategori/{kategori}'
*/
update.patch = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::update
* @see app/Http/Controllers/Sarpras/KategoriController.php:43
* @route '/sarpras/kategori/{kategori}'
*/
const updateForm = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::update
* @see app/Http/Controllers/Sarpras/KategoriController.php:43
* @route '/sarpras/kategori/{kategori}'
*/
updateForm.patch = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Sarpras\KategoriController::destroy
* @see app/Http/Controllers/Sarpras/KategoriController.php:58
* @route '/sarpras/kategori/{kategori}'
*/
export const destroy = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/kategori/{kategori}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::destroy
* @see app/Http/Controllers/Sarpras/KategoriController.php:58
* @route '/sarpras/kategori/{kategori}'
*/
destroy.url = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategori: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategori: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategori: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategori: typeof args.kategori === 'object'
        ? args.kategori.id
        : args.kategori,
    }

    return destroy.definition.url
            .replace('{kategori}', parsedArgs.kategori.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::destroy
* @see app/Http/Controllers/Sarpras/KategoriController.php:58
* @route '/sarpras/kategori/{kategori}'
*/
destroy.delete = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::destroy
* @see app/Http/Controllers/Sarpras/KategoriController.php:58
* @route '/sarpras/kategori/{kategori}'
*/
const destroyForm = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\KategoriController::destroy
* @see app/Http/Controllers/Sarpras/KategoriController.php:58
* @route '/sarpras/kategori/{kategori}'
*/
destroyForm.delete = (args: { kategori: number | { id: number } } | [kategori: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const kategori = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kategori