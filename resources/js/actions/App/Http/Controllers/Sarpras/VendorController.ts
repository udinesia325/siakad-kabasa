import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/vendor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::index
* @see app/Http/Controllers/Sarpras/VendorController.php:14
* @route '/sarpras/vendor'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/vendor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::store
* @see app/Http/Controllers/Sarpras/VendorController.php:31
* @route '/sarpras/vendor'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
const update24966b5b1fdb335901cf616b0531cd9d = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update24966b5b1fdb335901cf616b0531cd9d.url(args, options),
    method: 'put',
})

update24966b5b1fdb335901cf616b0531cd9d.definition = {
    methods: ["put"],
    url: '/sarpras/vendor/{vendor}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
update24966b5b1fdb335901cf616b0531cd9d.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return update24966b5b1fdb335901cf616b0531cd9d.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
update24966b5b1fdb335901cf616b0531cd9d.put = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update24966b5b1fdb335901cf616b0531cd9d.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
const update24966b5b1fdb335901cf616b0531cd9d = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update24966b5b1fdb335901cf616b0531cd9d.url(args, options),
    method: 'patch',
})

update24966b5b1fdb335901cf616b0531cd9d.definition = {
    methods: ["patch"],
    url: '/sarpras/vendor/{vendor}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
update24966b5b1fdb335901cf616b0531cd9d.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return update24966b5b1fdb335901cf616b0531cd9d.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::update
* @see app/Http/Controllers/Sarpras/VendorController.php:47
* @route '/sarpras/vendor/{vendor}'
*/
update24966b5b1fdb335901cf616b0531cd9d.patch = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update24966b5b1fdb335901cf616b0531cd9d.url(args, options),
    method: 'patch',
})

export const update = {
    '/sarpras/vendor/{vendor}': update24966b5b1fdb335901cf616b0531cd9d,
    '/sarpras/vendor/{vendor}': update24966b5b1fdb335901cf616b0531cd9d,
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
export const destroy = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/vendor/{vendor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
destroy.url = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vendor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vendor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vendor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vendor: typeof args.vendor === 'object'
        ? args.vendor.id
        : args.vendor,
    }

    return destroy.definition.url
            .replace('{vendor}', parsedArgs.vendor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\VendorController::destroy
* @see app/Http/Controllers/Sarpras/VendorController.php:63
* @route '/sarpras/vendor/{vendor}'
*/
destroy.delete = (args: { vendor: number | { id: number } } | [vendor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const VendorController = { index, store, update, destroy }

export default VendorController