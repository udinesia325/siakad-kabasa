import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/kasus-siswa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:16
* @route '/wakasis/kasus-siswa'
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
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:44
* @route '/wakasis/kasus-siswa'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/kasus-siswa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:44
* @route '/wakasis/kasus-siswa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:44
* @route '/wakasis/kasus-siswa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:44
* @route '/wakasis/kasus-siswa'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:44
* @route '/wakasis/kasus-siswa'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
const updatef9921f03e21a98fc775b26cb2bf559c2 = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, options),
    method: 'put',
})

updatef9921f03e21a98fc775b26cb2bf559c2.definition = {
    methods: ["put"],
    url: '/wakasis/kasus-siswa/{kasusSiswa}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
updatef9921f03e21a98fc775b26cb2bf559c2.url = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kasusSiswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kasusSiswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kasusSiswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kasusSiswa: typeof args.kasusSiswa === 'object'
        ? args.kasusSiswa.id
        : args.kasusSiswa,
    }

    return updatef9921f03e21a98fc775b26cb2bf559c2.definition.url
            .replace('{kasusSiswa}', parsedArgs.kasusSiswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
updatef9921f03e21a98fc775b26cb2bf559c2.put = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
const updatef9921f03e21a98fc775b26cb2bf559c2Form = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
updatef9921f03e21a98fc775b26cb2bf559c2Form.put = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatef9921f03e21a98fc775b26cb2bf559c2.form = updatef9921f03e21a98fc775b26cb2bf559c2Form
/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
const updatef9921f03e21a98fc775b26cb2bf559c2 = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, options),
    method: 'patch',
})

updatef9921f03e21a98fc775b26cb2bf559c2.definition = {
    methods: ["patch"],
    url: '/wakasis/kasus-siswa/{kasusSiswa}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
updatef9921f03e21a98fc775b26cb2bf559c2.url = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kasusSiswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kasusSiswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kasusSiswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kasusSiswa: typeof args.kasusSiswa === 'object'
        ? args.kasusSiswa.id
        : args.kasusSiswa,
    }

    return updatef9921f03e21a98fc775b26cb2bf559c2.definition.url
            .replace('{kasusSiswa}', parsedArgs.kasusSiswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
updatef9921f03e21a98fc775b26cb2bf559c2.patch = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
const updatef9921f03e21a98fc775b26cb2bf559c2Form = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:64
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
updatef9921f03e21a98fc775b26cb2bf559c2Form.patch = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatef9921f03e21a98fc775b26cb2bf559c2.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatef9921f03e21a98fc775b26cb2bf559c2.form = updatef9921f03e21a98fc775b26cb2bf559c2Form

export const update = {
    '/wakasis/kasus-siswa/{kasusSiswa}': updatef9921f03e21a98fc775b26cb2bf559c2,
    '/wakasis/kasus-siswa/{kasusSiswa}': updatef9921f03e21a98fc775b26cb2bf559c2,
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::destroy
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:82
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
export const destroy = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/kasus-siswa/{kasusSiswa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::destroy
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:82
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
destroy.url = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kasusSiswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kasusSiswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kasusSiswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kasusSiswa: typeof args.kasusSiswa === 'object'
        ? args.kasusSiswa.id
        : args.kasusSiswa,
    }

    return destroy.definition.url
            .replace('{kasusSiswa}', parsedArgs.kasusSiswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::destroy
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:82
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
destroy.delete = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::destroy
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:82
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
const destroyForm = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::destroy
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:82
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
destroyForm.delete = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const KasusSiswaController = { index, store, update, destroy }

export default KasusSiswaController