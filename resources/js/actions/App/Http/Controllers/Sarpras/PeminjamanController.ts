import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/peminjaman',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::index
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:15
* @route '/sarpras/peminjaman'
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
* @see \App\Http\Controllers\Sarpras\PeminjamanController::store
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:40
* @route '/sarpras/peminjaman'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/peminjaman',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::store
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:40
* @route '/sarpras/peminjaman'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::store
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:40
* @route '/sarpras/peminjaman'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::store
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:40
* @route '/sarpras/peminjaman'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::store
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:40
* @route '/sarpras/peminjaman'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::approve
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:59
* @route '/sarpras/peminjaman/{peminjaman}/approve'
*/
export const approve = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/sarpras/peminjaman/{peminjaman}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::approve
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:59
* @route '/sarpras/peminjaman/{peminjaman}/approve'
*/
approve.url = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { peminjaman: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { peminjaman: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            peminjaman: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        peminjaman: typeof args.peminjaman === 'object'
        ? args.peminjaman.id
        : args.peminjaman,
    }

    return approve.definition.url
            .replace('{peminjaman}', parsedArgs.peminjaman.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::approve
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:59
* @route '/sarpras/peminjaman/{peminjaman}/approve'
*/
approve.post = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::approve
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:59
* @route '/sarpras/peminjaman/{peminjaman}/approve'
*/
const approveForm = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::approve
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:59
* @route '/sarpras/peminjaman/{peminjaman}/approve'
*/
approveForm.post = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::reject
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:73
* @route '/sarpras/peminjaman/{peminjaman}/reject'
*/
export const reject = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/sarpras/peminjaman/{peminjaman}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::reject
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:73
* @route '/sarpras/peminjaman/{peminjaman}/reject'
*/
reject.url = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { peminjaman: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { peminjaman: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            peminjaman: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        peminjaman: typeof args.peminjaman === 'object'
        ? args.peminjaman.id
        : args.peminjaman,
    }

    return reject.definition.url
            .replace('{peminjaman}', parsedArgs.peminjaman.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::reject
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:73
* @route '/sarpras/peminjaman/{peminjaman}/reject'
*/
reject.post = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::reject
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:73
* @route '/sarpras/peminjaman/{peminjaman}/reject'
*/
const rejectForm = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::reject
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:73
* @route '/sarpras/peminjaman/{peminjaman}/reject'
*/
rejectForm.post = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::kembalikan
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:87
* @route '/sarpras/peminjaman/{peminjaman}/kembalikan'
*/
export const kembalikan = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kembalikan.url(args, options),
    method: 'post',
})

kembalikan.definition = {
    methods: ["post"],
    url: '/sarpras/peminjaman/{peminjaman}/kembalikan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::kembalikan
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:87
* @route '/sarpras/peminjaman/{peminjaman}/kembalikan'
*/
kembalikan.url = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { peminjaman: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { peminjaman: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            peminjaman: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        peminjaman: typeof args.peminjaman === 'object'
        ? args.peminjaman.id
        : args.peminjaman,
    }

    return kembalikan.definition.url
            .replace('{peminjaman}', parsedArgs.peminjaman.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::kembalikan
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:87
* @route '/sarpras/peminjaman/{peminjaman}/kembalikan'
*/
kembalikan.post = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kembalikan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::kembalikan
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:87
* @route '/sarpras/peminjaman/{peminjaman}/kembalikan'
*/
const kembalikanForm = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: kembalikan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::kembalikan
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:87
* @route '/sarpras/peminjaman/{peminjaman}/kembalikan'
*/
kembalikanForm.post = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: kembalikan.url(args, options),
    method: 'post',
})

kembalikan.form = kembalikanForm

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::destroy
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:101
* @route '/sarpras/peminjaman/{peminjaman}'
*/
export const destroy = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/peminjaman/{peminjaman}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::destroy
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:101
* @route '/sarpras/peminjaman/{peminjaman}'
*/
destroy.url = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { peminjaman: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { peminjaman: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            peminjaman: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        peminjaman: typeof args.peminjaman === 'object'
        ? args.peminjaman.id
        : args.peminjaman,
    }

    return destroy.definition.url
            .replace('{peminjaman}', parsedArgs.peminjaman.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::destroy
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:101
* @route '/sarpras/peminjaman/{peminjaman}'
*/
destroy.delete = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::destroy
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:101
* @route '/sarpras/peminjaman/{peminjaman}'
*/
const destroyForm = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\PeminjamanController::destroy
* @see app/Http/Controllers/Sarpras/PeminjamanController.php:101
* @route '/sarpras/peminjaman/{peminjaman}'
*/
destroyForm.delete = (args: { peminjaman: number | { id: number } } | [peminjaman: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PeminjamanController = { index, store, approve, reject, kembalikan, destroy }

export default PeminjamanController