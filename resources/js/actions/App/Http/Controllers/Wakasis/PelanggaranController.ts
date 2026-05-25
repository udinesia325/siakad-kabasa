import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/pelanggaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::index
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:22
* @route '/wakasis/pelanggaran'
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
* @see \App\Http\Controllers\Wakasis\PelanggaranController::store
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:60
* @route '/wakasis/pelanggaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/pelanggaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::store
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:60
* @route '/wakasis/pelanggaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::store
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:60
* @route '/wakasis/pelanggaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::store
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:60
* @route '/wakasis/pelanggaran'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::store
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:60
* @route '/wakasis/pelanggaran'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
const updatec80a9891db2a68086666debfb1e0062a = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatec80a9891db2a68086666debfb1e0062a.url(args, options),
    method: 'put',
})

updatec80a9891db2a68086666debfb1e0062a.definition = {
    methods: ["put"],
    url: '/wakasis/pelanggaran/{pelanggaran}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
updatec80a9891db2a68086666debfb1e0062a.url = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pelanggaran: typeof args.pelanggaran === 'object'
        ? args.pelanggaran.id
        : args.pelanggaran,
    }

    return updatec80a9891db2a68086666debfb1e0062a.definition.url
            .replace('{pelanggaran}', parsedArgs.pelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
updatec80a9891db2a68086666debfb1e0062a.put = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatec80a9891db2a68086666debfb1e0062a.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
const updatec80a9891db2a68086666debfb1e0062aForm = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec80a9891db2a68086666debfb1e0062a.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
updatec80a9891db2a68086666debfb1e0062aForm.put = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec80a9891db2a68086666debfb1e0062a.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatec80a9891db2a68086666debfb1e0062a.form = updatec80a9891db2a68086666debfb1e0062aForm
/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
const updatec80a9891db2a68086666debfb1e0062a = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatec80a9891db2a68086666debfb1e0062a.url(args, options),
    method: 'patch',
})

updatec80a9891db2a68086666debfb1e0062a.definition = {
    methods: ["patch"],
    url: '/wakasis/pelanggaran/{pelanggaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
updatec80a9891db2a68086666debfb1e0062a.url = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pelanggaran: typeof args.pelanggaran === 'object'
        ? args.pelanggaran.id
        : args.pelanggaran,
    }

    return updatec80a9891db2a68086666debfb1e0062a.definition.url
            .replace('{pelanggaran}', parsedArgs.pelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
updatec80a9891db2a68086666debfb1e0062a.patch = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatec80a9891db2a68086666debfb1e0062a.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
const updatec80a9891db2a68086666debfb1e0062aForm = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec80a9891db2a68086666debfb1e0062a.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::update
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:89
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
updatec80a9891db2a68086666debfb1e0062aForm.patch = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatec80a9891db2a68086666debfb1e0062a.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatec80a9891db2a68086666debfb1e0062a.form = updatec80a9891db2a68086666debfb1e0062aForm

export const update = {
    '/wakasis/pelanggaran/{pelanggaran}': updatec80a9891db2a68086666debfb1e0062a,
    '/wakasis/pelanggaran/{pelanggaran}': updatec80a9891db2a68086666debfb1e0062a,
}

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:129
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
export const destroy = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/pelanggaran/{pelanggaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:129
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
destroy.url = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pelanggaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pelanggaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pelanggaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pelanggaran: typeof args.pelanggaran === 'object'
        ? args.pelanggaran.id
        : args.pelanggaran,
    }

    return destroy.definition.url
            .replace('{pelanggaran}', parsedArgs.pelanggaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:129
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
destroy.delete = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:129
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
const destroyForm = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PelanggaranController::destroy
* @see app/Http/Controllers/Wakasis/PelanggaranController.php:129
* @route '/wakasis/pelanggaran/{pelanggaran}'
*/
destroyForm.delete = (args: { pelanggaran: number | { id: number } } | [pelanggaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PelanggaranController = { index, store, update, destroy }

export default PelanggaranController