import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jam-pelajaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::index
* @see app/Http/Controllers/JamPelajaranController.php:13
* @route '/jam-pelajaran'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jam-pelajaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::store
* @see app/Http/Controllers/JamPelajaranController.php:20
* @route '/jam-pelajaran'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
export const update = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/jam-pelajaran/{jamPelajaran}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
update.url = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jamPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jamPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jamPelajaran: typeof args.jamPelajaran === 'object'
        ? args.jamPelajaran.id
        : args.jamPelajaran,
    }

    return update.definition.url
            .replace('{jamPelajaran}', parsedArgs.jamPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::update
* @see app/Http/Controllers/JamPelajaranController.php:37
* @route '/jam-pelajaran/{jamPelajaran}'
*/
update.patch = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
export const destroy = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/jam-pelajaran/{jamPelajaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
destroy.url = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jamPelajaran: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jamPelajaran: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jamPelajaran: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jamPelajaran: typeof args.jamPelajaran === 'object'
        ? args.jamPelajaran.id
        : args.jamPelajaran,
    }

    return destroy.definition.url
            .replace('{jamPelajaran}', parsedArgs.jamPelajaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JamPelajaranController::destroy
* @see app/Http/Controllers/JamPelajaranController.php:54
* @route '/jam-pelajaran/{jamPelajaran}'
*/
destroy.delete = (args: { jamPelajaran: number | { id: number } } | [jamPelajaran: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const jamPelajaran = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default jamPelajaran