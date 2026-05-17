import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tahun-ajaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
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
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tahun-ajaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
export const update = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tahun-ajaran/{tahun_ajaran}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
update.url = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahun_ajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahun_ajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahun_ajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahun_ajaran: typeof args.tahun_ajaran === 'object'
        ? args.tahun_ajaran.id
        : args.tahun_ajaran,
    }

    return update.definition.url
            .replace('{tahun_ajaran}', parsedArgs.tahun_ajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
update.put = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
update.patch = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
const updateForm = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
updateForm.put = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:36
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
updateForm.patch = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:43
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
export const destroy = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tahun-ajaran/{tahun_ajaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:43
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
destroy.url = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahun_ajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahun_ajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahun_ajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahun_ajaran: typeof args.tahun_ajaran === 'object'
        ? args.tahun_ajaran.id
        : args.tahun_ajaran,
    }

    return destroy.definition.url
            .replace('{tahun_ajaran}', parsedArgs.tahun_ajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:43
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
destroy.delete = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:43
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
const destroyForm = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:43
* @route '/tahun-ajaran/{tahun_ajaran}'
*/
destroyForm.delete = (args: { tahun_ajaran: number | { id: number } } | [tahun_ajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:56
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
export const setAktif = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setAktif.url(args, options),
    method: 'patch',
})

setAktif.definition = {
    methods: ["patch"],
    url: '/tahun-ajaran/{tahunAjaran}/set-aktif',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:56
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktif.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahunAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahunAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahunAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahunAjaran: typeof args.tahunAjaran === 'object'
        ? args.tahunAjaran.id
        : args.tahunAjaran,
    }

    return setAktif.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:56
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktif.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setAktif.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:56
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
const setAktifForm = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setAktif.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:56
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktifForm.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setAktif.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

setAktif.form = setAktifForm

const TahunAjaranController = { index, store, update, destroy, setAktif }

export default TahunAjaranController