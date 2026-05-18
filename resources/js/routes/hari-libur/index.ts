import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hari-libur',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\HariLiburController::index
* @see app/Http/Controllers/HariLiburController.php:15
* @route '/hari-libur'
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
* @see \App\Http\Controllers\HariLiburController::store
* @see app/Http/Controllers/HariLiburController.php:32
* @route '/hari-libur'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/hari-libur',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HariLiburController::store
* @see app/Http/Controllers/HariLiburController.php:32
* @route '/hari-libur'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HariLiburController::store
* @see app/Http/Controllers/HariLiburController.php:32
* @route '/hari-libur'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HariLiburController::store
* @see app/Http/Controllers/HariLiburController.php:32
* @route '/hari-libur'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HariLiburController::store
* @see app/Http/Controllers/HariLiburController.php:32
* @route '/hari-libur'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\HariLiburController::update
* @see app/Http/Controllers/HariLiburController.php:65
* @route '/hari-libur/{hariLibur}'
*/
export const update = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/hari-libur/{hariLibur}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\HariLiburController::update
* @see app/Http/Controllers/HariLiburController.php:65
* @route '/hari-libur/{hariLibur}'
*/
update.url = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hariLibur: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hariLibur: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hariLibur: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        hariLibur: typeof args.hariLibur === 'object'
        ? args.hariLibur.id
        : args.hariLibur,
    }

    return update.definition.url
            .replace('{hariLibur}', parsedArgs.hariLibur.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HariLiburController::update
* @see app/Http/Controllers/HariLiburController.php:65
* @route '/hari-libur/{hariLibur}'
*/
update.patch = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\HariLiburController::update
* @see app/Http/Controllers/HariLiburController.php:65
* @route '/hari-libur/{hariLibur}'
*/
const updateForm = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HariLiburController::update
* @see app/Http/Controllers/HariLiburController.php:65
* @route '/hari-libur/{hariLibur}'
*/
updateForm.patch = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HariLiburController::destroy
* @see app/Http/Controllers/HariLiburController.php:77
* @route '/hari-libur/{hariLibur}'
*/
export const destroy = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/hari-libur/{hariLibur}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HariLiburController::destroy
* @see app/Http/Controllers/HariLiburController.php:77
* @route '/hari-libur/{hariLibur}'
*/
destroy.url = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { hariLibur: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { hariLibur: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            hariLibur: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        hariLibur: typeof args.hariLibur === 'object'
        ? args.hariLibur.id
        : args.hariLibur,
    }

    return destroy.definition.url
            .replace('{hariLibur}', parsedArgs.hariLibur.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HariLiburController::destroy
* @see app/Http/Controllers/HariLiburController.php:77
* @route '/hari-libur/{hariLibur}'
*/
destroy.delete = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\HariLiburController::destroy
* @see app/Http/Controllers/HariLiburController.php:77
* @route '/hari-libur/{hariLibur}'
*/
const destroyForm = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\HariLiburController::destroy
* @see app/Http/Controllers/HariLiburController.php:77
* @route '/hari-libur/{hariLibur}'
*/
destroyForm.delete = (args: { hariLibur: number | { id: number } } | [hariLibur: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const hariLibur = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default hariLibur