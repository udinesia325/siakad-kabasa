import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tahun-ajaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:15
* @route '/tahun-ajaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tahun-ajaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:29
* @route '/tahun-ajaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:38
* @route '/tahun-ajaran/{tahunAjaran}'
*/
const updateac0c97c848813c300a2b792d56c50868 = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateac0c97c848813c300a2b792d56c50868.url(args, options),
    method: 'put',
})

updateac0c97c848813c300a2b792d56c50868.definition = {
    methods: ["put"],
    url: '/tahun-ajaran/{tahunAjaran}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:38
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahunAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahunAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahunAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahunAjaran: typeof args.tahunAjaran === 'object'
        ? args.tahunAjaran.id
        : args.tahunAjaran,
    }

    return updateac0c97c848813c300a2b792d56c50868.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:38
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868.put = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateac0c97c848813c300a2b792d56c50868.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:38
* @route '/tahun-ajaran/{tahunAjaran}'
*/
const updateac0c97c848813c300a2b792d56c50868 = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateac0c97c848813c300a2b792d56c50868.url(args, options),
    method: 'patch',
})

updateac0c97c848813c300a2b792d56c50868.definition = {
    methods: ["patch"],
    url: '/tahun-ajaran/{tahunAjaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:38
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahunAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahunAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahunAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahunAjaran: typeof args.tahunAjaran === 'object'
        ? args.tahunAjaran.id
        : args.tahunAjaran,
    }

    return updateac0c97c848813c300a2b792d56c50868.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:38
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateac0c97c848813c300a2b792d56c50868.url(args, options),
    method: 'patch',
})

export const update = {
    '/tahun-ajaran/{tahunAjaran}': updateac0c97c848813c300a2b792d56c50868,
    '/tahun-ajaran/{tahunAjaran}': updateac0c97c848813c300a2b792d56c50868,
}

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:62
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
export const setAktif = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setAktif.url(args, options),
    method: 'patch',
})

setAktif.definition = {
    methods: ["patch"],
    url: '/tahun-ajaran/{tahunAjaran}/set-aktif',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:62
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktif.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahunAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahunAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahunAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahunAjaran: typeof args.tahunAjaran === 'object'
        ? args.tahunAjaran.id
        : args.tahunAjaran,
    }

    return setAktif.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:62
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktif.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setAktif.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:47
* @route '/tahun-ajaran/{tahunAjaran}'
*/
export const destroy = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tahun-ajaran/{tahunAjaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:47
* @route '/tahun-ajaran/{tahunAjaran}'
*/
destroy.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tahunAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tahunAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tahunAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tahunAjaran: typeof args.tahunAjaran === 'object'
        ? args.tahunAjaran.id
        : args.tahunAjaran,
    }

    return destroy.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:47
* @route '/tahun-ajaran/{tahunAjaran}'
*/
destroy.delete = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const TahunAjaranController = { index, store, update, setAktif, destroy }

export default TahunAjaranController