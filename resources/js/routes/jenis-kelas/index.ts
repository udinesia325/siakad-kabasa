import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\JenisKelasController::index
* @see app/Http/Controllers/Settings/JenisKelasController.php:16
* @route '/settings/jenis-kelas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/jenis-kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::index
* @see app/Http/Controllers/Settings/JenisKelasController.php:16
* @route '/settings/jenis-kelas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::index
* @see app/Http/Controllers/Settings/JenisKelasController.php:16
* @route '/settings/jenis-kelas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::index
* @see app/Http/Controllers/Settings/JenisKelasController.php:16
* @route '/settings/jenis-kelas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::store
* @see app/Http/Controllers/Settings/JenisKelasController.php:30
* @route '/settings/jenis-kelas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/settings/jenis-kelas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::store
* @see app/Http/Controllers/Settings/JenisKelasController.php:30
* @route '/settings/jenis-kelas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::store
* @see app/Http/Controllers/Settings/JenisKelasController.php:30
* @route '/settings/jenis-kelas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::update
* @see app/Http/Controllers/Settings/JenisKelasController.php:39
* @route '/settings/jenis-kelas/{jenis_kelas}'
*/
export const update = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/settings/jenis-kelas/{jenis_kelas}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::update
* @see app/Http/Controllers/Settings/JenisKelasController.php:39
* @route '/settings/jenis-kelas/{jenis_kelas}'
*/
update.url = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenis_kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenis_kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenis_kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenis_kelas: typeof args.jenis_kelas === 'object'
        ? args.jenis_kelas.id
        : args.jenis_kelas,
    }

    return update.definition.url
            .replace('{jenis_kelas}', parsedArgs.jenis_kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::update
* @see app/Http/Controllers/Settings/JenisKelasController.php:39
* @route '/settings/jenis-kelas/{jenis_kelas}'
*/
update.patch = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::destroy
* @see app/Http/Controllers/Settings/JenisKelasController.php:48
* @route '/settings/jenis-kelas/{jenis_kelas}'
*/
export const destroy = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/settings/jenis-kelas/{jenis_kelas}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::destroy
* @see app/Http/Controllers/Settings/JenisKelasController.php:48
* @route '/settings/jenis-kelas/{jenis_kelas}'
*/
destroy.url = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jenis_kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jenis_kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jenis_kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jenis_kelas: typeof args.jenis_kelas === 'object'
        ? args.jenis_kelas.id
        : args.jenis_kelas,
    }

    return destroy.definition.url
            .replace('{jenis_kelas}', parsedArgs.jenis_kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\JenisKelasController::destroy
* @see app/Http/Controllers/Settings/JenisKelasController.php:48
* @route '/settings/jenis-kelas/{jenis_kelas}'
*/
destroy.delete = (args: { jenis_kelas: number | { id: number } } | [jenis_kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const jenisKelas = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default jenisKelas