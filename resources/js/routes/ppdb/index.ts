import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import create from './create'
import edit from './edit'
/**
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ppdb',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PpdbController::store
* @see app/Http/Controllers/PpdbController.php:94
* @route '/ppdb'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ppdb',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PpdbController::store
* @see app/Http/Controllers/PpdbController.php:94
* @route '/ppdb'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::store
* @see app/Http/Controllers/PpdbController.php:94
* @route '/ppdb'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
export const update = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/ppdb/{ppdb}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ppdb: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ppdb: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ppdb: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ppdb: typeof args.ppdb === 'object'
        ? args.ppdb.id
        : args.ppdb,
    }

    return update.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update.patch = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PpdbController::aktivasi
* @see app/Http/Controllers/PpdbController.php:142
* @route '/ppdb/{ppdb}/aktivasi'
*/
export const aktivasi = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aktivasi.url(args, options),
    method: 'post',
})

aktivasi.definition = {
    methods: ["post"],
    url: '/ppdb/{ppdb}/aktivasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PpdbController::aktivasi
* @see app/Http/Controllers/PpdbController.php:142
* @route '/ppdb/{ppdb}/aktivasi'
*/
aktivasi.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ppdb: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ppdb: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ppdb: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ppdb: typeof args.ppdb === 'object'
        ? args.ppdb.id
        : args.ppdb,
    }

    return aktivasi.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::aktivasi
* @see app/Http/Controllers/PpdbController.php:142
* @route '/ppdb/{ppdb}/aktivasi'
*/
aktivasi.post = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: aktivasi.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::destroy
* @see app/Http/Controllers/PpdbController.php:125
* @route '/ppdb/{ppdb}'
*/
export const destroy = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ppdb/{ppdb}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PpdbController::destroy
* @see app/Http/Controllers/PpdbController.php:125
* @route '/ppdb/{ppdb}'
*/
destroy.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ppdb: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ppdb: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ppdb: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ppdb: typeof args.ppdb === 'object'
        ? args.ppdb.id
        : args.ppdb,
    }

    return destroy.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::destroy
* @see app/Http/Controllers/PpdbController.php:125
* @route '/ppdb/{ppdb}'
*/
destroy.delete = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ppdb = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    edit: Object.assign(edit, edit),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    aktivasi: Object.assign(aktivasi, aktivasi),
    destroy: Object.assign(destroy, destroy),
}

export default ppdb