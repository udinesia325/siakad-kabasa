import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jam-pelajaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
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
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jam-pelajaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
export const update = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/jam-pelajaran/{jamPelajaran}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
update.url = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jamPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jamPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jamPelajaran: typeof args.jamPelajaran === 'object'
        ? args.jamPelajaran.id
        : args.jamPelajaran,
    }

    return update.definition.url
            .replace('{jamPelajaran}', parsedArgs.jamPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
update.put = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
update.patch = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
const updateForm = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
updateForm.put = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
updateForm.patch = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
export const destroy = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jam-pelajaran/{jamPelajaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
destroy.url = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jamPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jamPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jamPelajaran: typeof args.jamPelajaran === 'object'
        ? args.jamPelajaran.id
        : args.jamPelajaran,
    }

    return destroy.definition.url
            .replace('{jamPelajaran}', parsedArgs.jamPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
destroy.delete = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
const destroyForm = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
destroyForm.delete = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const JamPelajaranController = { index, store, update, destroy }

export default JamPelajaranController