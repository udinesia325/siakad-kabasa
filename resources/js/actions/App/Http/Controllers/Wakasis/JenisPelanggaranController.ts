import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/jenis-pelanggaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::index
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:14
* @route '/wakasis/jenis-pelanggaran'
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
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::store
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:28
* @route '/wakasis/jenis-pelanggaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/jenis-pelanggaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::store
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:28
* @route '/wakasis/jenis-pelanggaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::store
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:28
* @route '/wakasis/jenis-pelanggaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::store
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:28
* @route '/wakasis/jenis-pelanggaran'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::store
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:28
* @route '/wakasis/jenis-pelanggaran'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
const update8ed86d4877eff7ee1f82ef0a0df11481 = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, options),
    method: 'put',
})

update8ed86d4877eff7ee1f82ef0a0df11481.definition = {
    methods: ["put"],
    url: '/wakasis/jenis-pelanggaran/{jenisPelanggaran}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
update8ed86d4877eff7ee1f82ef0a0df11481.url = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisPelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPelanggaran: typeof args.jenisPelanggaran === 'object'
        ? args.jenisPelanggaran.id
        : args.jenisPelanggaran,
    }

    return update8ed86d4877eff7ee1f82ef0a0df11481.definition.url
            .replace('{jenisPelanggaran}', parsedArgs.jenisPelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
update8ed86d4877eff7ee1f82ef0a0df11481.put = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
const update8ed86d4877eff7ee1f82ef0a0df11481Form = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
update8ed86d4877eff7ee1f82ef0a0df11481Form.put = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update8ed86d4877eff7ee1f82ef0a0df11481.form = update8ed86d4877eff7ee1f82ef0a0df11481Form
/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
const update8ed86d4877eff7ee1f82ef0a0df11481 = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, options),
    method: 'patch',
})

update8ed86d4877eff7ee1f82ef0a0df11481.definition = {
    methods: ["patch"],
    url: '/wakasis/jenis-pelanggaran/{jenisPelanggaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
update8ed86d4877eff7ee1f82ef0a0df11481.url = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisPelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPelanggaran: typeof args.jenisPelanggaran === 'object'
        ? args.jenisPelanggaran.id
        : args.jenisPelanggaran,
    }

    return update8ed86d4877eff7ee1f82ef0a0df11481.definition.url
            .replace('{jenisPelanggaran}', parsedArgs.jenisPelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
update8ed86d4877eff7ee1f82ef0a0df11481.patch = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
const update8ed86d4877eff7ee1f82ef0a0df11481Form = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::update
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:42
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
update8ed86d4877eff7ee1f82ef0a0df11481Form.patch = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8ed86d4877eff7ee1f82ef0a0df11481.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update8ed86d4877eff7ee1f82ef0a0df11481.form = update8ed86d4877eff7ee1f82ef0a0df11481Form

export const update = {
    '/wakasis/jenis-pelanggaran/{jenisPelanggaran}': update8ed86d4877eff7ee1f82ef0a0df11481,
    '/wakasis/jenis-pelanggaran/{jenisPelanggaran}': update8ed86d4877eff7ee1f82ef0a0df11481,
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:56
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
export const destroy = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/jenis-pelanggaran/{jenisPelanggaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:56
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
destroy.url = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisPelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPelanggaran: typeof args.jenisPelanggaran === 'object'
        ? args.jenisPelanggaran.id
        : args.jenisPelanggaran,
    }

    return destroy.definition.url
            .replace('{jenisPelanggaran}', parsedArgs.jenisPelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:56
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
destroy.delete = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:56
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
const destroyForm = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/JenisPelanggaranController.php:56
* @route '/wakasis/jenis-pelanggaran/{jenisPelanggaran}'
*/
destroyForm.delete = (args: { jenisPelanggaran: number | { id: number } } | [jenisPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const JenisPelanggaranController = { index, store, update, destroy }

export default JenisPelanggaranController