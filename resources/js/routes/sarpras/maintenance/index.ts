import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::index
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:16
* @route '/sarpras/maintenance'
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
* @see \App\Http\Controllers\Sarpras\MaintenanceController::store
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:39
* @route '/sarpras/maintenance'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::store
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:39
* @route '/sarpras/maintenance'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::store
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:39
* @route '/sarpras/maintenance'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::store
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:39
* @route '/sarpras/maintenance'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::store
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:39
* @route '/sarpras/maintenance'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::update
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:58
* @route '/sarpras/maintenance/{maintenance}'
*/
export const update = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/sarpras/maintenance/{maintenance}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::update
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:58
* @route '/sarpras/maintenance/{maintenance}'
*/
update.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { maintenance: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            maintenance: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        maintenance: typeof args.maintenance === 'object'
        ? args.maintenance.id
        : args.maintenance,
    }

    return update.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::update
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:58
* @route '/sarpras/maintenance/{maintenance}'
*/
update.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::update
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:58
* @route '/sarpras/maintenance/{maintenance}'
*/
const updateForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::update
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:58
* @route '/sarpras/maintenance/{maintenance}'
*/
updateForm.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::destroy
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:77
* @route '/sarpras/maintenance/{maintenance}'
*/
export const destroy = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/maintenance/{maintenance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::destroy
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:77
* @route '/sarpras/maintenance/{maintenance}'
*/
destroy.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { maintenance: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            maintenance: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        maintenance: typeof args.maintenance === 'object'
        ? args.maintenance.id
        : args.maintenance,
    }

    return destroy.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::destroy
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:77
* @route '/sarpras/maintenance/{maintenance}'
*/
destroy.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::destroy
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:77
* @route '/sarpras/maintenance/{maintenance}'
*/
const destroyForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\MaintenanceController::destroy
* @see app/Http/Controllers/Sarpras/MaintenanceController.php:77
* @route '/sarpras/maintenance/{maintenance}'
*/
destroyForm.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const maintenance = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default maintenance