import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MasterKelasController::index
* @see app/Http/Controllers/MasterKelasController.php:11
* @route '/master-kelas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/master-kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MasterKelasController::index
* @see app/Http/Controllers/MasterKelasController.php:11
* @route '/master-kelas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterKelasController::index
* @see app/Http/Controllers/MasterKelasController.php:11
* @route '/master-kelas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MasterKelasController::index
* @see app/Http/Controllers/MasterKelasController.php:11
* @route '/master-kelas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MasterKelasController::store
* @see app/Http/Controllers/MasterKelasController.php:18
* @route '/master-kelas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/master-kelas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MasterKelasController::store
* @see app/Http/Controllers/MasterKelasController.php:18
* @route '/master-kelas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterKelasController::store
* @see app/Http/Controllers/MasterKelasController.php:18
* @route '/master-kelas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MasterKelasController::update
* @see app/Http/Controllers/MasterKelasController.php:28
* @route '/master-kelas/{kelas}'
*/
export const update = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/master-kelas/{kelas}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MasterKelasController::update
* @see app/Http/Controllers/MasterKelasController.php:28
* @route '/master-kelas/{kelas}'
*/
update.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelas: typeof args.kelas === 'object'
        ? args.kelas.id
        : args.kelas,
    }

    return update.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MasterKelasController::update
* @see app/Http/Controllers/MasterKelasController.php:28
* @route '/master-kelas/{kelas}'
*/
update.patch = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

const masterKelas = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
}

export default masterKelas