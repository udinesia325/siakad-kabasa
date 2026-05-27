import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:19
* @route '/tahun-ajaran'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:19
* @route '/tahun-ajaran'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::index
* @see app/Http/Controllers/TahunAjaranController.php:19
* @route '/tahun-ajaran'
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
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:33
* @route '/tahun-ajaran'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::store
* @see app/Http/Controllers/TahunAjaranController.php:33
* @route '/tahun-ajaran'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
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
* @see app/Http/Controllers/TahunAjaranController.php:42
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
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868.put = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateac0c97c848813c300a2b792d56c50868.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
const updateac0c97c848813c300a2b792d56c50868Form = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateac0c97c848813c300a2b792d56c50868.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868Form.put = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateac0c97c848813c300a2b792d56c50868.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateac0c97c848813c300a2b792d56c50868.form = updateac0c97c848813c300a2b792d56c50868Form
/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
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
* @see app/Http/Controllers/TahunAjaranController.php:42
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
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateac0c97c848813c300a2b792d56c50868.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
const updateac0c97c848813c300a2b792d56c50868Form = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateac0c97c848813c300a2b792d56c50868.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::update
* @see app/Http/Controllers/TahunAjaranController.php:42
* @route '/tahun-ajaran/{tahunAjaran}'
*/
updateac0c97c848813c300a2b792d56c50868Form.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateac0c97c848813c300a2b792d56c50868.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateac0c97c848813c300a2b792d56c50868.form = updateac0c97c848813c300a2b792d56c50868Form

export const update = {
    '/tahun-ajaran/{tahunAjaran}': updateac0c97c848813c300a2b792d56c50868,
    '/tahun-ajaran/{tahunAjaran}': updateac0c97c848813c300a2b792d56c50868,
}

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
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:93
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
const setAktifForm = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setAktif.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::setAktif
* @see app/Http/Controllers/TahunAjaranController.php:93
* @route '/tahun-ajaran/{tahunAjaran}/set-aktif'
*/
setAktifForm.patch = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: setAktif.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

setAktif.form = setAktifForm

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
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
const previewAktivasiForm = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: previewAktivasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
previewAktivasiForm.get = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: previewAktivasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::previewAktivasi
* @see app/Http/Controllers/TahunAjaranController.php:66
* @route '/tahun-ajaran/{tahunAjaran}/preview-aktivasi'
*/
previewAktivasiForm.head = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: previewAktivasi.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

previewAktivasi.form = previewAktivasiForm

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
* @see \App\Http\Controllers\TahunAjaranController::buatKelasAjaran
* @see app/Http/Controllers/TahunAjaranController.php:81
* @route '/tahun-ajaran/{tahunAjaran}/buat-kelas-ajaran'
*/
const buatKelasAjaranForm = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: buatKelasAjaran.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::buatKelasAjaran
* @see app/Http/Controllers/TahunAjaranController.php:81
* @route '/tahun-ajaran/{tahunAjaran}/buat-kelas-ajaran'
*/
buatKelasAjaranForm.post = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: buatKelasAjaran.url(args, options),
    method: 'post',
})

buatKelasAjaran.form = buatKelasAjaranForm

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

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:51
* @route '/tahun-ajaran/{tahunAjaran}'
*/
const destroyForm = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TahunAjaranController::destroy
* @see app/Http/Controllers/TahunAjaranController.php:51
* @route '/tahun-ajaran/{tahunAjaran}'
*/
destroyForm.delete = (args: { tahunAjaran: number | { id: number } } | [tahunAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TahunAjaranController = { index, store, update, setAktif, previewAktivasi, buatKelasAjaran, destroy }

export default TahunAjaranController