import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import importMethod from './import'
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
export const update = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/siswa/{siswa}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
update.url = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{siswa}', parsedArgs.siswa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::update
* @see app/Http/Controllers/SiswaController.php:90
* @route '/siswa/{siswa}'
*/
update.patch = (args: { siswa: number | { id: number } } | [siswa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

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

const siswa = {
    import: Object.assign(importMethod, importMethod),
    riwayatKelas: Object.assign(riwayatKelas, riwayatKelas),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    assignRfid: Object.assign(assignRfid, assignRfid),
    mutasi: Object.assign(mutasi, mutasi),
    destroy: Object.assign(destroy, destroy),
}

export default siswa