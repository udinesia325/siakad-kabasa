import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::index
* @see app/Http/Controllers/PpdbController.php:23
* @route '/ppdb'
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
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ppdb/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::create
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
export const editPage = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editPage.url(args, options),
    method: 'get',
})

editPage.definition = {
    methods: ["get","head"],
    url: '/ppdb/{ppdb}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
editPage.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return editPage.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
editPage.get = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editPage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
editPage.head = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editPage.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
const editPageForm = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editPage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
editPageForm.get = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editPage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::editPage
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
editPageForm.head = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editPage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editPage.form = editPageForm

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
* @see \App\Http\Controllers\PpdbController::store
* @see app/Http/Controllers/PpdbController.php:94
* @route '/ppdb'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::store
* @see app/Http/Controllers/PpdbController.php:94
* @route '/ppdb'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
const update2f389ca0f9a388fdf63f44a54db3c30e = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, options),
    method: 'put',
})

update2f389ca0f9a388fdf63f44a54db3c30e.definition = {
    methods: ["put"],
    url: '/ppdb/{ppdb}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update2f389ca0f9a388fdf63f44a54db3c30e.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update2f389ca0f9a388fdf63f44a54db3c30e.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update2f389ca0f9a388fdf63f44a54db3c30e.put = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
const update2f389ca0f9a388fdf63f44a54db3c30eForm = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update2f389ca0f9a388fdf63f44a54db3c30eForm.put = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update2f389ca0f9a388fdf63f44a54db3c30e.form = update2f389ca0f9a388fdf63f44a54db3c30eForm
/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
const update2f389ca0f9a388fdf63f44a54db3c30e = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, options),
    method: 'patch',
})

update2f389ca0f9a388fdf63f44a54db3c30e.definition = {
    methods: ["patch"],
    url: '/ppdb/{ppdb}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update2f389ca0f9a388fdf63f44a54db3c30e.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update2f389ca0f9a388fdf63f44a54db3c30e.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update2f389ca0f9a388fdf63f44a54db3c30e.patch = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
const update2f389ca0f9a388fdf63f44a54db3c30eForm = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::update
* @see app/Http/Controllers/PpdbController.php:109
* @route '/ppdb/{ppdb}'
*/
update2f389ca0f9a388fdf63f44a54db3c30eForm.patch = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2f389ca0f9a388fdf63f44a54db3c30e.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update2f389ca0f9a388fdf63f44a54db3c30e.form = update2f389ca0f9a388fdf63f44a54db3c30eForm

export const update = {
    '/ppdb/{ppdb}': update2f389ca0f9a388fdf63f44a54db3c30e,
    '/ppdb/{ppdb}': update2f389ca0f9a388fdf63f44a54db3c30e,
}

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
* @see \App\Http\Controllers\PpdbController::aktivasi
* @see app/Http/Controllers/PpdbController.php:142
* @route '/ppdb/{ppdb}/aktivasi'
*/
const aktivasiForm = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: aktivasi.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::aktivasi
* @see app/Http/Controllers/PpdbController.php:142
* @route '/ppdb/{ppdb}/aktivasi'
*/
aktivasiForm.post = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: aktivasi.url(args, options),
    method: 'post',
})

aktivasi.form = aktivasiForm

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

/**
* @see \App\Http\Controllers\PpdbController::destroy
* @see app/Http/Controllers/PpdbController.php:125
* @route '/ppdb/{ppdb}'
*/
const destroyForm = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PpdbController::destroy
* @see app/Http/Controllers/PpdbController.php:125
* @route '/ppdb/{ppdb}'
*/
destroyForm.delete = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PpdbController = { index, create, editPage, store, update, aktivasi, destroy }

export default PpdbController