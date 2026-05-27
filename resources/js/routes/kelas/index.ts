import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
export const logOperasi = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logOperasi.url(args, options),
    method: 'get',
})

logOperasi.definition = {
    methods: ["get","head"],
    url: '/kelas/{kelasAjaran}/log-operasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
logOperasi.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelasAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelasAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
    }

    return logOperasi.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
logOperasi.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logOperasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
logOperasi.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logOperasi.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:94
* @route '/kelas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kelas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:94
* @route '/kelas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:94
* @route '/kelas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
export const update = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/kelas/{kelasAjaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
update.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelasAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelasAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
    }

    return update.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
update.patch = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:127
* @route '/kelas/{kelasAjaran}/naik-kelas'
*/
export const naikKelas = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: naikKelas.url(args, options),
    method: 'post',
})

naikKelas.definition = {
    methods: ["post"],
    url: '/kelas/{kelasAjaran}/naik-kelas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:127
* @route '/kelas/{kelasAjaran}/naik-kelas'
*/
naikKelas.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelasAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelasAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
    }

    return naikKelas.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:127
* @route '/kelas/{kelasAjaran}/naik-kelas'
*/
naikKelas.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: naikKelas.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:150
* @route '/kelas/{kelasAjaran}/luluskan'
*/
export const luluskan = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: luluskan.url(args, options),
    method: 'post',
})

luluskan.definition = {
    methods: ["post"],
    url: '/kelas/{kelasAjaran}/luluskan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:150
* @route '/kelas/{kelasAjaran}/luluskan'
*/
luluskan.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelasAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelasAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
    }

    return luluskan.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:150
* @route '/kelas/{kelasAjaran}/luluskan'
*/
luluskan.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: luluskan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:112
* @route '/kelas/{kelasAjaran}'
*/
export const destroy = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kelas/{kelasAjaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:112
* @route '/kelas/{kelasAjaran}'
*/
destroy.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelasAjaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelasAjaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelasAjaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelasAjaran: typeof args.kelasAjaran === 'object'
        ? args.kelasAjaran.id
        : args.kelasAjaran,
    }

    return destroy.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:112
* @route '/kelas/{kelasAjaran}'
*/
destroy.delete = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const kelas = {
    index: Object.assign(index, index),
    logOperasi: Object.assign(logOperasi, logOperasi),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    naikKelas: Object.assign(naikKelas, naikKelas),
    luluskan: Object.assign(luluskan, luluskan),
    destroy: Object.assign(destroy, destroy),
}

export default kelas