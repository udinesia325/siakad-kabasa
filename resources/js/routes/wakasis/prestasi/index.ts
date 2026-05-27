import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:19
* @route '/wakasis/prestasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/prestasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:19
* @route '/wakasis/prestasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:19
* @route '/wakasis/prestasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:19
* @route '/wakasis/prestasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:57
* @route '/wakasis/prestasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/prestasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:57
* @route '/wakasis/prestasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:57
* @route '/wakasis/prestasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::update
* @see app/Http/Controllers/Wakasis/PrestasiController.php:84
* @route '/wakasis/prestasi/{prestasi}'
*/
export const update = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/wakasis/prestasi/{prestasi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::update
* @see app/Http/Controllers/Wakasis/PrestasiController.php:84
* @route '/wakasis/prestasi/{prestasi}'
*/
update.url = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { prestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            prestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        prestasi: typeof args.prestasi === 'object'
        ? args.prestasi.id
        : args.prestasi,
    }

    return update.definition.url
            .replace('{prestasi}', parsedArgs.prestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::update
* @see app/Http/Controllers/Wakasis/PrestasiController.php:84
* @route '/wakasis/prestasi/{prestasi}'
*/
update.patch = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::destroy
* @see app/Http/Controllers/Wakasis/PrestasiController.php:112
* @route '/wakasis/prestasi/{prestasi}'
*/
export const destroy = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/prestasi/{prestasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::destroy
* @see app/Http/Controllers/Wakasis/PrestasiController.php:112
* @route '/wakasis/prestasi/{prestasi}'
*/
destroy.url = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { prestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            prestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        prestasi: typeof args.prestasi === 'object'
        ? args.prestasi.id
        : args.prestasi,
    }

    return destroy.definition.url
            .replace('{prestasi}', parsedArgs.prestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::destroy
* @see app/Http/Controllers/Wakasis/PrestasiController.php:112
* @route '/wakasis/prestasi/{prestasi}'
*/
destroy.delete = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::validate
* @see app/Http/Controllers/Wakasis/PrestasiController.php:123
* @route '/wakasis/prestasi/{prestasi}/validate'
*/
export const validate = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(args, options),
    method: 'post',
})

validate.definition = {
    methods: ["post"],
    url: '/wakasis/prestasi/{prestasi}/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::validate
* @see app/Http/Controllers/Wakasis/PrestasiController.php:123
* @route '/wakasis/prestasi/{prestasi}/validate'
*/
validate.url = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { prestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { prestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            prestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        prestasi: typeof args.prestasi === 'object'
        ? args.prestasi.id
        : args.prestasi,
    }

    return validate.definition.url
            .replace('{prestasi}', parsedArgs.prestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::validate
* @see app/Http/Controllers/Wakasis/PrestasiController.php:123
* @route '/wakasis/prestasi/{prestasi}/validate'
*/
validate.post = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(args, options),
    method: 'post',
})

const prestasi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    validate: Object.assign(validate, validate),
}

export default prestasi