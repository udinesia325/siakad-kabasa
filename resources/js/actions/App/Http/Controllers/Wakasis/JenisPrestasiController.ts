import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/jenis-prestasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::index
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:14
* @route '/wakasis/jenis-prestasi'
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
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::store
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:28
* @route '/wakasis/jenis-prestasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/jenis-prestasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::store
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:28
* @route '/wakasis/jenis-prestasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::store
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:28
* @route '/wakasis/jenis-prestasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::store
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:28
* @route '/wakasis/jenis-prestasi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::store
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:28
* @route '/wakasis/jenis-prestasi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
const updatecaaeafea82afb461feb37367aa2bcdfd = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, options),
    method: 'put',
})

updatecaaeafea82afb461feb37367aa2bcdfd.definition = {
    methods: ["put"],
    url: '/wakasis/jenis-prestasi/{jenisPrestasi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
updatecaaeafea82afb461feb37367aa2bcdfd.url = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPrestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisPrestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPrestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPrestasi: typeof args.jenisPrestasi === 'object'
        ? args.jenisPrestasi.id
        : args.jenisPrestasi,
    }

    return updatecaaeafea82afb461feb37367aa2bcdfd.definition.url
            .replace('{jenisPrestasi}', parsedArgs.jenisPrestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
updatecaaeafea82afb461feb37367aa2bcdfd.put = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
const updatecaaeafea82afb461feb37367aa2bcdfdForm = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
updatecaaeafea82afb461feb37367aa2bcdfdForm.put = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatecaaeafea82afb461feb37367aa2bcdfd.form = updatecaaeafea82afb461feb37367aa2bcdfdForm
/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
const updatecaaeafea82afb461feb37367aa2bcdfd = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, options),
    method: 'patch',
})

updatecaaeafea82afb461feb37367aa2bcdfd.definition = {
    methods: ["patch"],
    url: '/wakasis/jenis-prestasi/{jenisPrestasi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
updatecaaeafea82afb461feb37367aa2bcdfd.url = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPrestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisPrestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPrestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPrestasi: typeof args.jenisPrestasi === 'object'
        ? args.jenisPrestasi.id
        : args.jenisPrestasi,
    }

    return updatecaaeafea82afb461feb37367aa2bcdfd.definition.url
            .replace('{jenisPrestasi}', parsedArgs.jenisPrestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
updatecaaeafea82afb461feb37367aa2bcdfd.patch = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
const updatecaaeafea82afb461feb37367aa2bcdfdForm = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::update
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:41
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
updatecaaeafea82afb461feb37367aa2bcdfdForm.patch = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatecaaeafea82afb461feb37367aa2bcdfd.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatecaaeafea82afb461feb37367aa2bcdfd.form = updatecaaeafea82afb461feb37367aa2bcdfdForm

export const update = {
    '/wakasis/jenis-prestasi/{jenisPrestasi}': updatecaaeafea82afb461feb37367aa2bcdfd,
    '/wakasis/jenis-prestasi/{jenisPrestasi}': updatecaaeafea82afb461feb37367aa2bcdfd,
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:54
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
export const destroy = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/jenis-prestasi/{jenisPrestasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:54
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
destroy.url = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenisPrestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenisPrestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenisPrestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenisPrestasi: typeof args.jenisPrestasi === 'object'
        ? args.jenisPrestasi.id
        : args.jenisPrestasi,
    }

    return destroy.definition.url
            .replace('{jenisPrestasi}', parsedArgs.jenisPrestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:54
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
destroy.delete = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:54
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
const destroyForm = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\JenisPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/JenisPrestasiController.php:54
* @route '/wakasis/jenis-prestasi/{jenisPrestasi}'
*/
destroyForm.delete = (args: { jenisPrestasi: number | { id: number } } | [jenisPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const JenisPrestasiController = { index, store, update, destroy }

export default JenisPrestasiController