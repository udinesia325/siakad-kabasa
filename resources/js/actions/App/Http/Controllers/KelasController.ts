import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:27
* @route '/kelas'
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
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
const logOperasiForm = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logOperasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
logOperasiForm.get = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logOperasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:159
* @route '/kelas/{kelasAjaran}/log-operasi'
*/
logOperasiForm.head = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logOperasi.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

logOperasi.form = logOperasiForm

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
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:94
* @route '/kelas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:94
* @route '/kelas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
const updated9d27e2fe390c35f14c08461f65377d9 = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated9d27e2fe390c35f14c08461f65377d9.url(args, options),
    method: 'put',
})

updated9d27e2fe390c35f14c08461f65377d9.definition = {
    methods: ["put"],
    url: '/kelas/{kelasAjaran}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
updated9d27e2fe390c35f14c08461f65377d9.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updated9d27e2fe390c35f14c08461f65377d9.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
updated9d27e2fe390c35f14c08461f65377d9.put = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updated9d27e2fe390c35f14c08461f65377d9.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
const updated9d27e2fe390c35f14c08461f65377d9Form = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated9d27e2fe390c35f14c08461f65377d9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
updated9d27e2fe390c35f14c08461f65377d9Form.put = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated9d27e2fe390c35f14c08461f65377d9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updated9d27e2fe390c35f14c08461f65377d9.form = updated9d27e2fe390c35f14c08461f65377d9Form
/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
const updated9d27e2fe390c35f14c08461f65377d9 = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated9d27e2fe390c35f14c08461f65377d9.url(args, options),
    method: 'patch',
})

updated9d27e2fe390c35f14c08461f65377d9.definition = {
    methods: ["patch"],
    url: '/kelas/{kelasAjaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
updated9d27e2fe390c35f14c08461f65377d9.url = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updated9d27e2fe390c35f14c08461f65377d9.definition.url
            .replace('{kelasAjaran}', parsedArgs.kelasAjaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
updated9d27e2fe390c35f14c08461f65377d9.patch = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updated9d27e2fe390c35f14c08461f65377d9.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
const updated9d27e2fe390c35f14c08461f65377d9Form = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated9d27e2fe390c35f14c08461f65377d9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:103
* @route '/kelas/{kelasAjaran}'
*/
updated9d27e2fe390c35f14c08461f65377d9Form.patch = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updated9d27e2fe390c35f14c08461f65377d9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updated9d27e2fe390c35f14c08461f65377d9.form = updated9d27e2fe390c35f14c08461f65377d9Form

export const update = {
    '/kelas/{kelasAjaran}': updated9d27e2fe390c35f14c08461f65377d9,
    '/kelas/{kelasAjaran}': updated9d27e2fe390c35f14c08461f65377d9,
}

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
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:127
* @route '/kelas/{kelasAjaran}/naik-kelas'
*/
const naikKelasForm = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: naikKelas.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:127
* @route '/kelas/{kelasAjaran}/naik-kelas'
*/
naikKelasForm.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: naikKelas.url(args, options),
    method: 'post',
})

naikKelas.form = naikKelasForm

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
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:150
* @route '/kelas/{kelasAjaran}/luluskan'
*/
const luluskanForm = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: luluskan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:150
* @route '/kelas/{kelasAjaran}/luluskan'
*/
luluskanForm.post = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: luluskan.url(args, options),
    method: 'post',
})

luluskan.form = luluskanForm

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

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:112
* @route '/kelas/{kelasAjaran}'
*/
const destroyForm = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:112
* @route '/kelas/{kelasAjaran}'
*/
destroyForm.delete = (args: { kelasAjaran: number | { id: number } } | [kelasAjaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const KelasController = { index, logOperasi, store, update, naikKelas, luluskan, destroy }

export default KelasController