import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/poin-pelanggaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::index
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:15
* @route '/wakasis/poin-pelanggaran'
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
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::store
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:34
* @route '/wakasis/poin-pelanggaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/poin-pelanggaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::store
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:34
* @route '/wakasis/poin-pelanggaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::store
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:34
* @route '/wakasis/poin-pelanggaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::store
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:34
* @route '/wakasis/poin-pelanggaran'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::store
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:34
* @route '/wakasis/poin-pelanggaran'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
const update2d18c3ffcd1fc662b699f47c5c8e9cc1 = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, options),
    method: 'put',
})

update2d18c3ffcd1fc662b699f47c5c8e9cc1.definition = {
    methods: ["put"],
    url: '/wakasis/poin-pelanggaran/{poinPelanggaran}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
update2d18c3ffcd1fc662b699f47c5c8e9cc1.url = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poinPelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { poinPelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            poinPelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        poinPelanggaran: typeof args.poinPelanggaran === 'object'
        ? args.poinPelanggaran.id
        : args.poinPelanggaran,
    }

    return update2d18c3ffcd1fc662b699f47c5c8e9cc1.definition.url
            .replace('{poinPelanggaran}', parsedArgs.poinPelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
update2d18c3ffcd1fc662b699f47c5c8e9cc1.put = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
const update2d18c3ffcd1fc662b699f47c5c8e9cc1Form = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
update2d18c3ffcd1fc662b699f47c5c8e9cc1Form.put = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update2d18c3ffcd1fc662b699f47c5c8e9cc1.form = update2d18c3ffcd1fc662b699f47c5c8e9cc1Form
/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
const update2d18c3ffcd1fc662b699f47c5c8e9cc1 = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, options),
    method: 'patch',
})

update2d18c3ffcd1fc662b699f47c5c8e9cc1.definition = {
    methods: ["patch"],
    url: '/wakasis/poin-pelanggaran/{poinPelanggaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
update2d18c3ffcd1fc662b699f47c5c8e9cc1.url = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poinPelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { poinPelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            poinPelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        poinPelanggaran: typeof args.poinPelanggaran === 'object'
        ? args.poinPelanggaran.id
        : args.poinPelanggaran,
    }

    return update2d18c3ffcd1fc662b699f47c5c8e9cc1.definition.url
            .replace('{poinPelanggaran}', parsedArgs.poinPelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
update2d18c3ffcd1fc662b699f47c5c8e9cc1.patch = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
const update2d18c3ffcd1fc662b699f47c5c8e9cc1Form = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::update
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:49
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
update2d18c3ffcd1fc662b699f47c5c8e9cc1Form.patch = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2d18c3ffcd1fc662b699f47c5c8e9cc1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update2d18c3ffcd1fc662b699f47c5c8e9cc1.form = update2d18c3ffcd1fc662b699f47c5c8e9cc1Form

export const update = {
    '/wakasis/poin-pelanggaran/{poinPelanggaran}': update2d18c3ffcd1fc662b699f47c5c8e9cc1,
    '/wakasis/poin-pelanggaran/{poinPelanggaran}': update2d18c3ffcd1fc662b699f47c5c8e9cc1,
}

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:64
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
export const destroy = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/poin-pelanggaran/{poinPelanggaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:64
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
destroy.url = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { poinPelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { poinPelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            poinPelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        poinPelanggaran: typeof args.poinPelanggaran === 'object'
        ? args.poinPelanggaran.id
        : args.poinPelanggaran,
    }

    return destroy.definition.url
            .replace('{poinPelanggaran}', parsedArgs.poinPelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:64
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
destroy.delete = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:64
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
const destroyForm = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PoinPelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PoinPelanggaranController.php:64
* @route '/wakasis/poin-pelanggaran/{poinPelanggaran}'
*/
destroyForm.delete = (args: { poinPelanggaran: number | { id: number } } | [poinPelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PoinPelanggaranController = { index, store, update, destroy }

export default PoinPelanggaranController