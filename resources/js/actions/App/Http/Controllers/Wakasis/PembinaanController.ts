import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/pembinaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::index
* @see app/Http/Controllers/Wakasis/PembinaanController.php:18
* @route '/wakasis/pembinaan'
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
* @see \App\Http\Controllers\Wakasis\PembinaanController::store
* @see app/Http/Controllers/Wakasis/PembinaanController.php:47
* @route '/wakasis/pembinaan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/pembinaan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::store
* @see app/Http/Controllers/Wakasis/PembinaanController.php:47
* @route '/wakasis/pembinaan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::store
* @see app/Http/Controllers/Wakasis/PembinaanController.php:47
* @route '/wakasis/pembinaan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::store
* @see app/Http/Controllers/Wakasis/PembinaanController.php:47
* @route '/wakasis/pembinaan'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::store
* @see app/Http/Controllers/Wakasis/PembinaanController.php:47
* @route '/wakasis/pembinaan'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
const update8eb99abb849e5566183fdffe70cf309e = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update8eb99abb849e5566183fdffe70cf309e.url(args, options),
    method: 'put',
})

update8eb99abb849e5566183fdffe70cf309e.definition = {
    methods: ["put"],
    url: '/wakasis/pembinaan/{pembinaan}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
update8eb99abb849e5566183fdffe70cf309e.url = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pembinaan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pembinaan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pembinaan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pembinaan: typeof args.pembinaan === 'object'
        ? args.pembinaan.id
        : args.pembinaan,
    }

    return update8eb99abb849e5566183fdffe70cf309e.definition.url
            .replace('{pembinaan}', parsedArgs.pembinaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
update8eb99abb849e5566183fdffe70cf309e.put = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update8eb99abb849e5566183fdffe70cf309e.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
const update8eb99abb849e5566183fdffe70cf309eForm = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8eb99abb849e5566183fdffe70cf309e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
update8eb99abb849e5566183fdffe70cf309eForm.put = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8eb99abb849e5566183fdffe70cf309e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update8eb99abb849e5566183fdffe70cf309e.form = update8eb99abb849e5566183fdffe70cf309eForm
/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
const update8eb99abb849e5566183fdffe70cf309e = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update8eb99abb849e5566183fdffe70cf309e.url(args, options),
    method: 'patch',
})

update8eb99abb849e5566183fdffe70cf309e.definition = {
    methods: ["patch"],
    url: '/wakasis/pembinaan/{pembinaan}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
update8eb99abb849e5566183fdffe70cf309e.url = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pembinaan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pembinaan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pembinaan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pembinaan: typeof args.pembinaan === 'object'
        ? args.pembinaan.id
        : args.pembinaan,
    }

    return update8eb99abb849e5566183fdffe70cf309e.definition.url
            .replace('{pembinaan}', parsedArgs.pembinaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
update8eb99abb849e5566183fdffe70cf309e.patch = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update8eb99abb849e5566183fdffe70cf309e.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
const update8eb99abb849e5566183fdffe70cf309eForm = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8eb99abb849e5566183fdffe70cf309e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::update
* @see app/Http/Controllers/Wakasis/PembinaanController.php:66
* @route '/wakasis/pembinaan/{pembinaan}'
*/
update8eb99abb849e5566183fdffe70cf309eForm.patch = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update8eb99abb849e5566183fdffe70cf309e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update8eb99abb849e5566183fdffe70cf309e.form = update8eb99abb849e5566183fdffe70cf309eForm

export const update = {
    '/wakasis/pembinaan/{pembinaan}': update8eb99abb849e5566183fdffe70cf309e,
    '/wakasis/pembinaan/{pembinaan}': update8eb99abb849e5566183fdffe70cf309e,
}

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::destroy
* @see app/Http/Controllers/Wakasis/PembinaanController.php:85
* @route '/wakasis/pembinaan/{pembinaan}'
*/
export const destroy = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/pembinaan/{pembinaan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::destroy
* @see app/Http/Controllers/Wakasis/PembinaanController.php:85
* @route '/wakasis/pembinaan/{pembinaan}'
*/
destroy.url = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pembinaan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pembinaan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pembinaan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pembinaan: typeof args.pembinaan === 'object'
        ? args.pembinaan.id
        : args.pembinaan,
    }

    return destroy.definition.url
            .replace('{pembinaan}', parsedArgs.pembinaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::destroy
* @see app/Http/Controllers/Wakasis/PembinaanController.php:85
* @route '/wakasis/pembinaan/{pembinaan}'
*/
destroy.delete = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::destroy
* @see app/Http/Controllers/Wakasis/PembinaanController.php:85
* @route '/wakasis/pembinaan/{pembinaan}'
*/
const destroyForm = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\PembinaanController::destroy
* @see app/Http/Controllers/Wakasis/PembinaanController.php:85
* @route '/wakasis/pembinaan/{pembinaan}'
*/
destroyForm.delete = (args: { pembinaan: number | { id: number } } | [pembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PembinaanController = { index, store, update, destroy }

export default PembinaanController