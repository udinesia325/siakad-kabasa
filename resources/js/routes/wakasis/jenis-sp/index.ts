import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/jenis-sp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:14
* @route '/wakasis/jenis-sp'
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
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::store
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:28
* @route '/wakasis/jenis-sp'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/jenis-sp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::store
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:28
* @route '/wakasis/jenis-sp'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::store
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:28
* @route '/wakasis/jenis-sp'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::store
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:28
* @route '/wakasis/jenis-sp'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::store
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:28
* @route '/wakasis/jenis-sp'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
export const update = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/wakasis/jenis-sp/{jenisSp}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
update.url = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisSp: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisSp: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisSp: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisSp: typeof args.jenisSp === 'object'
        ? args.jenisSp.id
        : args.jenisSp,
    }

    return update.definition.url
            .replace('{jenisSp}', parsedArgs.jenisSp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
update.patch = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
const updateForm = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
updateForm.patch = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::destroy
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:58
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
export const destroy = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/jenis-sp/{jenisSp}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::destroy
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:58
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
destroy.url = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisSp: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisSp: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisSp: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisSp: typeof args.jenisSp === 'object'
        ? args.jenisSp.id
        : args.jenisSp,
    }

    return destroy.definition.url
            .replace('{jenisSp}', parsedArgs.jenisSp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::destroy
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:58
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
destroy.delete = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::destroy
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:58
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
const destroyForm = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::destroy
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:58
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
destroyForm.delete = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const jenisSp = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default jenisSp