import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tingkat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TingkatController::index
* @see app/Http/Controllers/TingkatController.php:15
* @route '/tingkat'
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
* @see \App\Http\Controllers\TingkatController::store
* @see app/Http/Controllers/TingkatController.php:29
* @route '/tingkat'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tingkat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TingkatController::store
* @see app/Http/Controllers/TingkatController.php:29
* @route '/tingkat'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TingkatController::store
* @see app/Http/Controllers/TingkatController.php:29
* @route '/tingkat'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TingkatController::store
* @see app/Http/Controllers/TingkatController.php:29
* @route '/tingkat'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TingkatController::store
* @see app/Http/Controllers/TingkatController.php:29
* @route '/tingkat'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TingkatController::update
* @see app/Http/Controllers/TingkatController.php:38
* @route '/tingkat/{tingkat}'
*/
export const update = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/tingkat/{tingkat}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TingkatController::update
* @see app/Http/Controllers/TingkatController.php:38
* @route '/tingkat/{tingkat}'
*/
update.url = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tingkat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tingkat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tingkat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tingkat: typeof args.tingkat === 'object'
        ? args.tingkat.id
        : args.tingkat,
    }

    return update.definition.url
            .replace('{tingkat}', parsedArgs.tingkat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TingkatController::update
* @see app/Http/Controllers/TingkatController.php:38
* @route '/tingkat/{tingkat}'
*/
update.patch = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TingkatController::update
* @see app/Http/Controllers/TingkatController.php:38
* @route '/tingkat/{tingkat}'
*/
const updateForm = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TingkatController::update
* @see app/Http/Controllers/TingkatController.php:38
* @route '/tingkat/{tingkat}'
*/
updateForm.patch = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TingkatController::destroy
* @see app/Http/Controllers/TingkatController.php:47
* @route '/tingkat/{tingkat}'
*/
export const destroy = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tingkat/{tingkat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TingkatController::destroy
* @see app/Http/Controllers/TingkatController.php:47
* @route '/tingkat/{tingkat}'
*/
destroy.url = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tingkat: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tingkat: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tingkat: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tingkat: typeof args.tingkat === 'object'
        ? args.tingkat.id
        : args.tingkat,
    }

    return destroy.definition.url
            .replace('{tingkat}', parsedArgs.tingkat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TingkatController::destroy
* @see app/Http/Controllers/TingkatController.php:47
* @route '/tingkat/{tingkat}'
*/
destroy.delete = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TingkatController::destroy
* @see app/Http/Controllers/TingkatController.php:47
* @route '/tingkat/{tingkat}'
*/
const destroyForm = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TingkatController::destroy
* @see app/Http/Controllers/TingkatController.php:47
* @route '/tingkat/{tingkat}'
*/
destroyForm.delete = (args: { tingkat: number | { id: number } } | [tingkat: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TingkatController = { index, store, update, destroy }

export default TingkatController