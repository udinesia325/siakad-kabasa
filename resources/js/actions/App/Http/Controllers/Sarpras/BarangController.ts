import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/barang',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::index
* @see app/Http/Controllers/Sarpras/BarangController.php:21
* @route '/sarpras/barang'
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
* @see \App\Http\Controllers\Sarpras\BarangController::store
* @see app/Http/Controllers/Sarpras/BarangController.php:54
* @route '/sarpras/barang'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/barang',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\BarangController::store
* @see app/Http/Controllers/Sarpras/BarangController.php:54
* @route '/sarpras/barang'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BarangController::store
* @see app/Http/Controllers/Sarpras/BarangController.php:54
* @route '/sarpras/barang'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::store
* @see app/Http/Controllers/Sarpras/BarangController.php:54
* @route '/sarpras/barang'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::store
* @see app/Http/Controllers/Sarpras/BarangController.php:54
* @route '/sarpras/barang'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
const update5cff869a1f54b0c3528fdba17217b0ff = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update5cff869a1f54b0c3528fdba17217b0ff.url(args, options),
    method: 'put',
})

update5cff869a1f54b0c3528fdba17217b0ff.definition = {
    methods: ["put"],
    url: '/sarpras/barang/{barang}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
update5cff869a1f54b0c3528fdba17217b0ff.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { barang: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        barang: typeof args.barang === 'object'
        ? args.barang.id
        : args.barang,
    }

    return update5cff869a1f54b0c3528fdba17217b0ff.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
update5cff869a1f54b0c3528fdba17217b0ff.put = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update5cff869a1f54b0c3528fdba17217b0ff.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
const update5cff869a1f54b0c3528fdba17217b0ffForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5cff869a1f54b0c3528fdba17217b0ff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
update5cff869a1f54b0c3528fdba17217b0ffForm.put = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5cff869a1f54b0c3528fdba17217b0ff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update5cff869a1f54b0c3528fdba17217b0ff.form = update5cff869a1f54b0c3528fdba17217b0ffForm
/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
const update5cff869a1f54b0c3528fdba17217b0ff = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update5cff869a1f54b0c3528fdba17217b0ff.url(args, options),
    method: 'patch',
})

update5cff869a1f54b0c3528fdba17217b0ff.definition = {
    methods: ["patch"],
    url: '/sarpras/barang/{barang}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
update5cff869a1f54b0c3528fdba17217b0ff.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { barang: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        barang: typeof args.barang === 'object'
        ? args.barang.id
        : args.barang,
    }

    return update5cff869a1f54b0c3528fdba17217b0ff.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
update5cff869a1f54b0c3528fdba17217b0ff.patch = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update5cff869a1f54b0c3528fdba17217b0ff.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
const update5cff869a1f54b0c3528fdba17217b0ffForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5cff869a1f54b0c3528fdba17217b0ff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::update
* @see app/Http/Controllers/Sarpras/BarangController.php:70
* @route '/sarpras/barang/{barang}'
*/
update5cff869a1f54b0c3528fdba17217b0ffForm.patch = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update5cff869a1f54b0c3528fdba17217b0ff.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update5cff869a1f54b0c3528fdba17217b0ff.form = update5cff869a1f54b0c3528fdba17217b0ffForm

export const update = {
    '/sarpras/barang/{barang}': update5cff869a1f54b0c3528fdba17217b0ff,
    '/sarpras/barang/{barang}': update5cff869a1f54b0c3528fdba17217b0ff,
}

/**
* @see \App\Http\Controllers\Sarpras\BarangController::destroy
* @see app/Http/Controllers/Sarpras/BarangController.php:87
* @route '/sarpras/barang/{barang}'
*/
export const destroy = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/barang/{barang}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\BarangController::destroy
* @see app/Http/Controllers/Sarpras/BarangController.php:87
* @route '/sarpras/barang/{barang}'
*/
destroy.url = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { barang: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { barang: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            barang: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        barang: typeof args.barang === 'object'
        ? args.barang.id
        : args.barang,
    }

    return destroy.definition.url
            .replace('{barang}', parsedArgs.barang.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BarangController::destroy
* @see app/Http/Controllers/Sarpras/BarangController.php:87
* @route '/sarpras/barang/{barang}'
*/
destroy.delete = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::destroy
* @see app/Http/Controllers/Sarpras/BarangController.php:87
* @route '/sarpras/barang/{barang}'
*/
const destroyForm = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BarangController::destroy
* @see app/Http/Controllers/Sarpras/BarangController.php:87
* @route '/sarpras/barang/{barang}'
*/
destroyForm.delete = (args: { barang: number | { id: number } } | [barang: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const BarangController = { index, store, update, destroy }

export default BarangController