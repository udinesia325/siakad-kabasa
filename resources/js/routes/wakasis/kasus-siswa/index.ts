import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:15
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
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:15
* @route '/wakasis/kasus-siswa'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:15
* @route '/wakasis/kasus-siswa'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::index
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:15
* @route '/wakasis/kasus-siswa'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:42
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
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:42
* @route '/wakasis/kasus-siswa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::store
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:42
* @route '/wakasis/kasus-siswa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:62
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
export const update = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/wakasis/kasus-siswa/{kasusSiswa}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:62
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
update.url = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{kasusSiswa}', parsedArgs.kasusSiswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::update
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:62
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
update.patch = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\KasusSiswaController::destroy
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:80
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
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:80
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
* @see app/Http/Controllers/Wakasis/KasusSiswaController.php:80
* @route '/wakasis/kasus-siswa/{kasusSiswa}'
*/
destroy.delete = (args: { kasusSiswa: number | { id: number } } | [kasusSiswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const kasusSiswa = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kasusSiswa