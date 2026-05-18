import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:23
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
* @see app/Http/Controllers/KelasController.php:23
* @route '/kelas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:23
* @route '/kelas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:23
* @route '/kelas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:23
* @route '/kelas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:23
* @route '/kelas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::index
* @see app/Http/Controllers/KelasController.php:23
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
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
export const logOperasi = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logOperasi.url(args, options),
    method: 'get',
})

logOperasi.definition = {
    methods: ["get","head"],
    url: '/kelas/{kelas}/log-operasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
logOperasi.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return logOperasi.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
logOperasi.get = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: logOperasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
logOperasi.head = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: logOperasi.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
const logOperasiForm = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logOperasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
logOperasiForm.get = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: logOperasi.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\KelasController::logOperasi
* @see app/Http/Controllers/KelasController.php:104
* @route '/kelas/{kelas}/log-operasi'
*/
logOperasiForm.head = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/KelasController.php:49
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
* @see app/Http/Controllers/KelasController.php:49
* @route '/kelas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:49
* @route '/kelas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:49
* @route '/kelas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::store
* @see app/Http/Controllers/KelasController.php:49
* @route '/kelas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
const update9bce44535afc3dace436af85de013b19 = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9bce44535afc3dace436af85de013b19.url(args, options),
    method: 'put',
})

update9bce44535afc3dace436af85de013b19.definition = {
    methods: ["put"],
    url: '/kelas/{kelas}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
update9bce44535afc3dace436af85de013b19.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update9bce44535afc3dace436af85de013b19.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
update9bce44535afc3dace436af85de013b19.put = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9bce44535afc3dace436af85de013b19.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
const update9bce44535afc3dace436af85de013b19Form = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update9bce44535afc3dace436af85de013b19.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
update9bce44535afc3dace436af85de013b19Form.put = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update9bce44535afc3dace436af85de013b19.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update9bce44535afc3dace436af85de013b19.form = update9bce44535afc3dace436af85de013b19Form
/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
const update9bce44535afc3dace436af85de013b19 = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update9bce44535afc3dace436af85de013b19.url(args, options),
    method: 'patch',
})

update9bce44535afc3dace436af85de013b19.definition = {
    methods: ["patch"],
    url: '/kelas/{kelas}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
update9bce44535afc3dace436af85de013b19.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update9bce44535afc3dace436af85de013b19.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
update9bce44535afc3dace436af85de013b19.patch = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update9bce44535afc3dace436af85de013b19.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
const update9bce44535afc3dace436af85de013b19Form = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update9bce44535afc3dace436af85de013b19.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::update
* @see app/Http/Controllers/KelasController.php:56
* @route '/kelas/{kelas}'
*/
update9bce44535afc3dace436af85de013b19Form.patch = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update9bce44535afc3dace436af85de013b19.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update9bce44535afc3dace436af85de013b19.form = update9bce44535afc3dace436af85de013b19Form

export const update = {
    '/kelas/{kelas}': update9bce44535afc3dace436af85de013b19,
    '/kelas/{kelas}': update9bce44535afc3dace436af85de013b19,
}

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:76
* @route '/kelas/{kelas}/naik-kelas'
*/
export const naikKelas = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: naikKelas.url(args, options),
    method: 'post',
})

naikKelas.definition = {
    methods: ["post"],
    url: '/kelas/{kelas}/naik-kelas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:76
* @route '/kelas/{kelas}/naik-kelas'
*/
naikKelas.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return naikKelas.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:76
* @route '/kelas/{kelas}/naik-kelas'
*/
naikKelas.post = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: naikKelas.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:76
* @route '/kelas/{kelas}/naik-kelas'
*/
const naikKelasForm = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: naikKelas.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::naikKelas
* @see app/Http/Controllers/KelasController.php:76
* @route '/kelas/{kelas}/naik-kelas'
*/
naikKelasForm.post = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: naikKelas.url(args, options),
    method: 'post',
})

naikKelas.form = naikKelasForm

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:97
* @route '/kelas/{kelas}/luluskan'
*/
export const luluskan = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: luluskan.url(args, options),
    method: 'post',
})

luluskan.definition = {
    methods: ["post"],
    url: '/kelas/{kelas}/luluskan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:97
* @route '/kelas/{kelas}/luluskan'
*/
luluskan.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return luluskan.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:97
* @route '/kelas/{kelas}/luluskan'
*/
luluskan.post = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: luluskan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:97
* @route '/kelas/{kelas}/luluskan'
*/
const luluskanForm = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: luluskan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\KelasController::luluskan
* @see app/Http/Controllers/KelasController.php:97
* @route '/kelas/{kelas}/luluskan'
*/
luluskanForm.post = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: luluskan.url(args, options),
    method: 'post',
})

luluskan.form = luluskanForm

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:63
* @route '/kelas/{kelas}'
*/
export const destroy = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kelas/{kelas}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:63
* @route '/kelas/{kelas}'
*/
destroy.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:63
* @route '/kelas/{kelas}'
*/
destroy.delete = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\KelasController::destroy
* @see app/Http/Controllers/KelasController.php:63
* @route '/kelas/{kelas}'
*/
const destroyForm = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/KelasController.php:63
* @route '/kelas/{kelas}'
*/
destroyForm.delete = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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