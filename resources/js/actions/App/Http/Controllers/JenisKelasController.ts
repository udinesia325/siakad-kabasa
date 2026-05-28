import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jenis-kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JenisKelasController::index
* @see app/Http/Controllers/JenisKelasController.php:14
* @route '/jenis-kelas'
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
* @see \App\Http\Controllers\JenisKelasController::store
* @see app/Http/Controllers/JenisKelasController.php:28
* @route '/jenis-kelas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jenis-kelas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JenisKelasController::store
* @see app/Http/Controllers/JenisKelasController.php:28
* @route '/jenis-kelas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisKelasController::store
* @see app/Http/Controllers/JenisKelasController.php:28
* @route '/jenis-kelas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JenisKelasController::store
* @see app/Http/Controllers/JenisKelasController.php:28
* @route '/jenis-kelas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JenisKelasController::store
* @see app/Http/Controllers/JenisKelasController.php:28
* @route '/jenis-kelas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\JenisKelasController::update
* @see app/Http/Controllers/JenisKelasController.php:37
* @route '/jenis-kelas/{jenis_kelas}'
*/
export const update = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/jenis-kelas/{jenis_kelas}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\JenisKelasController::update
* @see app/Http/Controllers/JenisKelasController.php:37
* @route '/jenis-kelas/{jenis_kelas}'
*/
update.url = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenis_kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenis_kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenis_kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenis_kelas: typeof args.jenis_kelas === 'object'
        ? args.jenis_kelas.id
        : args.jenis_kelas,
    }

    return update.definition.url
            .replace('{jenis_kelas}', parsedArgs.jenis_kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisKelasController::update
* @see app/Http/Controllers/JenisKelasController.php:37
* @route '/jenis-kelas/{jenis_kelas}'
*/
update.patch = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\JenisKelasController::update
* @see app/Http/Controllers/JenisKelasController.php:37
* @route '/jenis-kelas/{jenis_kelas}'
*/
const updateForm = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JenisKelasController::update
* @see app/Http/Controllers/JenisKelasController.php:37
* @route '/jenis-kelas/{jenis_kelas}'
*/
updateForm.patch = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JenisKelasController::destroy
* @see app/Http/Controllers/JenisKelasController.php:46
* @route '/jenis-kelas/{jenis_kelas}'
*/
export const destroy = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jenis-kelas/{jenis_kelas}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JenisKelasController::destroy
* @see app/Http/Controllers/JenisKelasController.php:46
* @route '/jenis-kelas/{jenis_kelas}'
*/
destroy.url = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenis_kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenis_kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenis_kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenis_kelas: typeof args.jenis_kelas === 'object'
        ? args.jenis_kelas.id
        : args.jenis_kelas,
    }

    return destroy.definition.url
            .replace('{jenis_kelas}', parsedArgs.jenis_kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JenisKelasController::destroy
* @see app/Http/Controllers/JenisKelasController.php:46
* @route '/jenis-kelas/{jenis_kelas}'
*/
destroy.delete = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\JenisKelasController::destroy
* @see app/Http/Controllers/JenisKelasController.php:46
* @route '/jenis-kelas/{jenis_kelas}'
*/
const destroyForm = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JenisKelasController::destroy
* @see app/Http/Controllers/JenisKelasController.php:46
* @route '/jenis-kelas/{jenis_kelas}'
*/
destroyForm.delete = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const JenisKelasController = { index, store, update, destroy }

export default JenisKelasController