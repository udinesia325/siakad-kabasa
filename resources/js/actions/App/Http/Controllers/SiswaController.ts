import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SiswaController::importTemplate
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
export const importTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: importTemplate.url(options),
    method: 'get',
})

importTemplate.definition = {
    methods: ["get","head"],
    url: '/siswa/import/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SiswaController::importTemplate
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
importTemplate.url = (options?: RouteQueryOptions) => {
    return importTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::importTemplate
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
importTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: importTemplate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::importTemplate
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
importTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: importTemplate.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::riwayatKelas
* @see app/Http/Controllers/SiswaController.php:224
* @route '/siswa/{siswa}/riwayat-kelas'
*/
export const riwayatKelas = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatKelas.url(args, options),
    method: 'get',
})

riwayatKelas.definition = {
    methods: ["get","head"],
    url: '/siswa/{siswa}/riwayat-kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SiswaController::riwayatKelas
* @see app/Http/Controllers/SiswaController.php:224
* @route '/siswa/{siswa}/riwayat-kelas'
*/
riwayatKelas.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return riwayatKelas.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::riwayatKelas
* @see app/Http/Controllers/SiswaController.php:224
* @route '/siswa/{siswa}/riwayat-kelas'
*/
riwayatKelas.get = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayatKelas.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::riwayatKelas
* @see app/Http/Controllers/SiswaController.php:224
* @route '/siswa/{siswa}/riwayat-kelas'
*/
riwayatKelas.head = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayatKelas.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::index
* @see app/Http/Controllers/SiswaController.php:26
* @route '/siswa'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/siswa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SiswaController::index
* @see app/Http/Controllers/SiswaController.php:26
* @route '/siswa'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::index
* @see app/Http/Controllers/SiswaController.php:26
* @route '/siswa'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::index
* @see app/Http/Controllers/SiswaController.php:26
* @route '/siswa'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::create
* @see app/Http/Controllers/SiswaController.php:63
* @route '/siswa/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/siswa/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SiswaController::create
* @see app/Http/Controllers/SiswaController.php:63
* @route '/siswa/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::create
* @see app/Http/Controllers/SiswaController.php:63
* @route '/siswa/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::create
* @see app/Http/Controllers/SiswaController.php:63
* @route '/siswa/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:70
* @route '/siswa'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/siswa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:70
* @route '/siswa'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:70
* @route '/siswa'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::importPreview
* @see app/Http/Controllers/SiswaController.php:133
* @route '/siswa/import/preview'
*/
export const importPreview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importPreview.url(options),
    method: 'post',
})

importPreview.definition = {
    methods: ["post"],
    url: '/siswa/import/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::importPreview
* @see app/Http/Controllers/SiswaController.php:133
* @route '/siswa/import/preview'
*/
importPreview.url = (options?: RouteQueryOptions) => {
    return importPreview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::importPreview
* @see app/Http/Controllers/SiswaController.php:133
* @route '/siswa/import/preview'
*/
importPreview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importPreview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::importStore
* @see app/Http/Controllers/SiswaController.php:157
* @route '/siswa/import/store'
*/
export const importStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importStore.url(options),
    method: 'post',
})

importStore.definition = {
    methods: ["post"],
    url: '/siswa/import/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::importStore
* @see app/Http/Controllers/SiswaController.php:157
* @route '/siswa/import/store'
*/
importStore.url = (options?: RouteQueryOptions) => {
    return importStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::importStore
* @see app/Http/Controllers/SiswaController.php:157
* @route '/siswa/import/store'
*/
importStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importStore.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::edit
* @see app/Http/Controllers/SiswaController.php:82
* @route '/siswa/{siswa}/edit'
*/
export const edit = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/siswa/{siswa}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SiswaController::edit
* @see app/Http/Controllers/SiswaController.php:82
* @route '/siswa/{siswa}/edit'
*/
edit.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return edit.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::edit
* @see app/Http/Controllers/SiswaController.php:82
* @route '/siswa/{siswa}/edit'
*/
edit.get = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::edit
* @see app/Http/Controllers/SiswaController.php:82
* @route '/siswa/{siswa}/edit'
*/
edit.head = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
const update42355668e85efa5458d3ba50b19160ae = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update42355668e85efa5458d3ba50b19160ae.url(args, options),
    method: 'put',
})

update42355668e85efa5458d3ba50b19160ae.definition = {
    methods: ["put"],
    url: '/siswa/{siswa}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
update42355668e85efa5458d3ba50b19160ae.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return update42355668e85efa5458d3ba50b19160ae.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
update42355668e85efa5458d3ba50b19160ae.put = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update42355668e85efa5458d3ba50b19160ae.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
const update42355668e85efa5458d3ba50b19160ae = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update42355668e85efa5458d3ba50b19160ae.url(args, options),
    method: 'patch',
})

update42355668e85efa5458d3ba50b19160ae.definition = {
    methods: ["patch"],
    url: '/siswa/{siswa}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
update42355668e85efa5458d3ba50b19160ae.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return update42355668e85efa5458d3ba50b19160ae.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
update42355668e85efa5458d3ba50b19160ae.patch = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update42355668e85efa5458d3ba50b19160ae.url(args, options),
    method: 'patch',
})

export const update = {
    '/siswa/{siswa}': update42355668e85efa5458d3ba50b19160ae,
    '/siswa/{siswa}': update42355668e85efa5458d3ba50b19160ae,
}

/**
* @see \App\Http\Controllers\SiswaController::assignRfid
* @see app/Http/Controllers/SiswaController.php:108
* @route '/siswa/{siswa}/assign-rfid'
*/
export const assignRfid = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignRfid.url(args, options),
    method: 'post',
})

assignRfid.definition = {
    methods: ["post"],
    url: '/siswa/{siswa}/assign-rfid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::assignRfid
* @see app/Http/Controllers/SiswaController.php:108
* @route '/siswa/{siswa}/assign-rfid'
*/
assignRfid.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return assignRfid.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::assignRfid
* @see app/Http/Controllers/SiswaController.php:108
* @route '/siswa/{siswa}/assign-rfid'
*/
assignRfid.post = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignRfid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::mutasi
* @see app/Http/Controllers/SiswaController.php:205
* @route '/siswa/{siswa}/mutasi'
*/
export const mutasi = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mutasi.url(args, options),
    method: 'post',
})

mutasi.definition = {
    methods: ["post"],
    url: '/siswa/{siswa}/mutasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::mutasi
* @see app/Http/Controllers/SiswaController.php:205
* @route '/siswa/{siswa}/mutasi'
*/
mutasi.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return mutasi.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::mutasi
* @see app/Http/Controllers/SiswaController.php:205
* @route '/siswa/{siswa}/mutasi'
*/
mutasi.post = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mutasi.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::destroy
* @see app/Http/Controllers/SiswaController.php:99
* @route '/siswa/{siswa}'
*/
export const destroy = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/siswa/{siswa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SiswaController::destroy
* @see app/Http/Controllers/SiswaController.php:99
* @route '/siswa/{siswa}'
*/
destroy.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { siswa: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { siswa: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            siswa: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        siswa: typeof args.siswa === 'object'
        ? args.siswa.id
        : args.siswa,
    }

    return destroy.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::destroy
* @see app/Http/Controllers/SiswaController.php:99
* @route '/siswa/{siswa}'
*/
destroy.delete = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const SiswaController = { importTemplate, riwayatKelas, index, create, store, importPreview, importStore, edit, update, assignRfid, mutasi, destroy }

export default SiswaController