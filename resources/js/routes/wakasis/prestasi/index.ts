import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
* @route '/wakasis/prestasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
* @route '/wakasis/prestasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
* @route '/wakasis/prestasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
* @route '/wakasis/prestasi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
* @route '/wakasis/prestasi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::index
* @see app/Http/Controllers/Wakasis/PrestasiController.php:20
* @route '/wakasis/prestasi'
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
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:59
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:59
* @route '/wakasis/prestasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:59
* @route '/wakasis/prestasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:59
* @route '/wakasis/prestasi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::store
* @see app/Http/Controllers/Wakasis/PrestasiController.php:59
* @route '/wakasis/prestasi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::update
* @see app/Http/Controllers/Wakasis/PrestasiController.php:86
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:86
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:86
* @route '/wakasis/prestasi/{prestasi}'
*/
update.patch = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::update
* @see app/Http/Controllers/Wakasis/PrestasiController.php:86
* @route '/wakasis/prestasi/{prestasi}'
*/
const updateForm = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::update
* @see app/Http/Controllers/Wakasis/PrestasiController.php:86
* @route '/wakasis/prestasi/{prestasi}'
*/
updateForm.patch = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Wakasis\PrestasiController::destroy
* @see app/Http/Controllers/Wakasis/PrestasiController.php:114
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:114
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:114
* @route '/wakasis/prestasi/{prestasi}'
*/
destroy.delete = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::destroy
* @see app/Http/Controllers/Wakasis/PrestasiController.php:114
* @route '/wakasis/prestasi/{prestasi}'
*/
const destroyForm = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::destroy
* @see app/Http/Controllers/Wakasis/PrestasiController.php:114
* @route '/wakasis/prestasi/{prestasi}'
*/
destroyForm.delete = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Wakasis\PrestasiController::validate
* @see app/Http/Controllers/Wakasis/PrestasiController.php:125
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:125
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
* @see app/Http/Controllers/Wakasis/PrestasiController.php:125
* @route '/wakasis/prestasi/{prestasi}/validate'
*/
validate.post = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::validate
* @see app/Http/Controllers/Wakasis/PrestasiController.php:125
* @route '/wakasis/prestasi/{prestasi}/validate'
*/
const validateForm = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PrestasiController::validate
* @see app/Http/Controllers/Wakasis/PrestasiController.php:125
* @route '/wakasis/prestasi/{prestasi}/validate'
*/
validateForm.post = (args: { prestasi: number | { id: number } } | [prestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(args, options),
    method: 'post',
})

validate.form = validateForm

const prestasi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    validate: Object.assign(validate, validate),
}

export default prestasi