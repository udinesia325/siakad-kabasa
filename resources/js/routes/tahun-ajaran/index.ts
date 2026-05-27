import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:19
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
* @see app/Http/Controllers/TahunAjaranController.php:19
* @route '/tahun-ajaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:19
* @route '/tahun-ajaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:19
* @route '/tahun-ajaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:33
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
* @see app/Http/Controllers/TahunAjaranController.php:33
* @route '/tahun-ajaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:33
* @route '/tahun-ajaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
export const update = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/tahun-ajaran/{tahunAjaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
update.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
update.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:93
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
* @see app/Http/Controllers/TahunAjaranController.php:93
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
* @see app/Http/Controllers/TahunAjaranController.php:93
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktif.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: setAktif.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
export const previewAktivasi = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewAktivasi.url(args, options),
    method: 'get',
})

previewAktivasi.definition = {
    methods: ["get","head"],
    url: '/tahun-ajaran/{tahunAjaran}/preview-aktivasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
previewAktivasi.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return previewAktivasi.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
previewAktivasi.get = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: previewAktivasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
previewAktivasi.head = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: previewAktivasi.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::buatKelasAjaran
* @see app/Http/Controllers/TahunAjaranController.php:81
* @route '/tahun-ajaran/{tahunAjaran}/buat-kelas-ajaran'
*/
export const buatKelasAjaran = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buatKelasAjaran.url(args, options),
    method: 'post',
})

buatKelasAjaran.definition = {
    methods: ["post"],
    url: '/tahun-ajaran/{tahunAjaran}/buat-kelas-ajaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TahunAjaranController::buatKelasAjaran
* @see app/Http/Controllers/TahunAjaranController.php:81
* @route '/tahun-ajaran/{tahunAjaran}/buat-kelas-ajaran'
*/
buatKelasAjaran.url = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return buatKelasAjaran.definition.url
            .replace('{tahunAjaran}', parsedArgs.tahunAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TahunAjaranController::buatKelasAjaran
* @see app/Http/Controllers/TahunAjaranController.php:81
* @route '/tahun-ajaran/{tahunAjaran}/buat-kelas-ajaran'
*/
buatKelasAjaran.post = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: buatKelasAjaran.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:51
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
* @see app/Http/Controllers/TahunAjaranController.php:51
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
* @see app/Http/Controllers/TahunAjaranController.php:51
* @route '/tahun-ajaran/{tahunAjaran}'
*/
destroy.delete = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const tahunAjaran = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    setAktif: Object.assign(setAktif, setAktif),
    previewAktivasi: Object.assign(previewAktivasi, previewAktivasi),
    buatKelasAjaran: Object.assign(buatKelasAjaran, buatKelasAjaran),
    destroy: Object.assign(destroy, destroy),
}

export default tahunAjaran