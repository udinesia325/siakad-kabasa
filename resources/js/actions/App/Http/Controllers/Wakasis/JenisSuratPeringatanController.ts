import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
const updatefd15e9e2a0efc22c07783f9c1115d4e1 = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, options),
    method: 'put',
})

updatefd15e9e2a0efc22c07783f9c1115d4e1.definition = {
    methods: ["put"],
    url: '/wakasis/jenis-sp/{jenisSp}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
updatefd15e9e2a0efc22c07783f9c1115d4e1.url = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatefd15e9e2a0efc22c07783f9c1115d4e1.definition.url
            .replace('{jenisSp}', parsedArgs.jenisSp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
updatefd15e9e2a0efc22c07783f9c1115d4e1.put = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
const updatefd15e9e2a0efc22c07783f9c1115d4e1Form = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
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
updatefd15e9e2a0efc22c07783f9c1115d4e1Form.put = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatefd15e9e2a0efc22c07783f9c1115d4e1.form = updatefd15e9e2a0efc22c07783f9c1115d4e1Form
/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
const updatefd15e9e2a0efc22c07783f9c1115d4e1 = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, options),
    method: 'patch',
})

updatefd15e9e2a0efc22c07783f9c1115d4e1.definition = {
    methods: ["patch"],
    url: '/wakasis/jenis-sp/{jenisSp}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
updatefd15e9e2a0efc22c07783f9c1115d4e1.url = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatefd15e9e2a0efc22c07783f9c1115d4e1.definition.url
            .replace('{jenisSp}', parsedArgs.jenisSp.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
updatefd15e9e2a0efc22c07783f9c1115d4e1.patch = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisSuratPeringatanController::update
* @see app/Http/Controllers/Wakasis/JenisSuratPeringatanController.php:43
* @route '/wakasis/jenis-sp/{jenisSp}'
*/
const updatefd15e9e2a0efc22c07783f9c1115d4e1Form = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, {
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
updatefd15e9e2a0efc22c07783f9c1115d4e1Form.patch = (args: { jenisSp: number | { id: number } } | [jenisSp: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefd15e9e2a0efc22c07783f9c1115d4e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatefd15e9e2a0efc22c07783f9c1115d4e1.form = updatefd15e9e2a0efc22c07783f9c1115d4e1Form

export const update = {
    '/wakasis/jenis-sp/{jenisSp}': updatefd15e9e2a0efc22c07783f9c1115d4e1,
    '/wakasis/jenis-sp/{jenisSp}': updatefd15e9e2a0efc22c07783f9c1115d4e1,
}

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

const JenisSuratPeringatanController = { index, store, update, destroy }

export default JenisSuratPeringatanController