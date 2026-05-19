import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pegawai',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PegawaiController::index
* @see app/Http/Controllers/PegawaiController.php:21
* @route '/pegawai'
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
* @see \App\Http\Controllers\PegawaiController::store
* @see app/Http/Controllers/PegawaiController.php:55
* @route '/pegawai'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pegawai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PegawaiController::store
* @see app/Http/Controllers/PegawaiController.php:55
* @route '/pegawai'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::store
* @see app/Http/Controllers/PegawaiController.php:55
* @route '/pegawai'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::store
* @see app/Http/Controllers/PegawaiController.php:55
* @route '/pegawai'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::store
* @see app/Http/Controllers/PegawaiController.php:55
* @route '/pegawai'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
const updatea0e403200379d58201b758ab3eac7011 = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatea0e403200379d58201b758ab3eac7011.url(args, options),
    method: 'put',
})

updatea0e403200379d58201b758ab3eac7011.definition = {
    methods: ["put"],
    url: '/pegawai/{pegawai}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
updatea0e403200379d58201b758ab3eac7011.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return updatea0e403200379d58201b758ab3eac7011.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
updatea0e403200379d58201b758ab3eac7011.put = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatea0e403200379d58201b758ab3eac7011.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
const updatea0e403200379d58201b758ab3eac7011Form = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatea0e403200379d58201b758ab3eac7011.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
updatea0e403200379d58201b758ab3eac7011Form.put = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatea0e403200379d58201b758ab3eac7011.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatea0e403200379d58201b758ab3eac7011.form = updatea0e403200379d58201b758ab3eac7011Form
/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
const updatea0e403200379d58201b758ab3eac7011 = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatea0e403200379d58201b758ab3eac7011.url(args, options),
    method: 'patch',
})

updatea0e403200379d58201b758ab3eac7011.definition = {
    methods: ["patch"],
    url: '/pegawai/{pegawai}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
updatea0e403200379d58201b758ab3eac7011.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return updatea0e403200379d58201b758ab3eac7011.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
updatea0e403200379d58201b758ab3eac7011.patch = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatea0e403200379d58201b758ab3eac7011.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
const updatea0e403200379d58201b758ab3eac7011Form = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatea0e403200379d58201b758ab3eac7011.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::update
* @see app/Http/Controllers/PegawaiController.php:69
* @route '/pegawai/{pegawai}'
*/
updatea0e403200379d58201b758ab3eac7011Form.patch = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatea0e403200379d58201b758ab3eac7011.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatea0e403200379d58201b758ab3eac7011.form = updatea0e403200379d58201b758ab3eac7011Form

export const update = {
    '/pegawai/{pegawai}': updatea0e403200379d58201b758ab3eac7011,
    '/pegawai/{pegawai}': updatea0e403200379d58201b758ab3eac7011,
}

/**
* @see \App\Http\Controllers\PegawaiController::assignUser
* @see app/Http/Controllers/PegawaiController.php:83
* @route '/pegawai/{pegawai}/assign-user'
*/
export const assignUser = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignUser.url(args, options),
    method: 'post',
})

assignUser.definition = {
    methods: ["post"],
    url: '/pegawai/{pegawai}/assign-user',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PegawaiController::assignUser
* @see app/Http/Controllers/PegawaiController.php:83
* @route '/pegawai/{pegawai}/assign-user'
*/
assignUser.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return assignUser.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::assignUser
* @see app/Http/Controllers/PegawaiController.php:83
* @route '/pegawai/{pegawai}/assign-user'
*/
assignUser.post = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::assignUser
* @see app/Http/Controllers/PegawaiController.php:83
* @route '/pegawai/{pegawai}/assign-user'
*/
const assignUserForm = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignUser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::assignUser
* @see app/Http/Controllers/PegawaiController.php:83
* @route '/pegawai/{pegawai}/assign-user'
*/
assignUserForm.post = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignUser.url(args, options),
    method: 'post',
})

assignUser.form = assignUserForm

/**
* @see \App\Http\Controllers\PegawaiController::revokeUser
* @see app/Http/Controllers/PegawaiController.php:123
* @route '/pegawai/{pegawai}/revoke-user'
*/
export const revokeUser = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revokeUser.url(args, options),
    method: 'delete',
})

revokeUser.definition = {
    methods: ["delete"],
    url: '/pegawai/{pegawai}/revoke-user',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PegawaiController::revokeUser
* @see app/Http/Controllers/PegawaiController.php:123
* @route '/pegawai/{pegawai}/revoke-user'
*/
revokeUser.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return revokeUser.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::revokeUser
* @see app/Http/Controllers/PegawaiController.php:123
* @route '/pegawai/{pegawai}/revoke-user'
*/
revokeUser.delete = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revokeUser.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PegawaiController::revokeUser
* @see app/Http/Controllers/PegawaiController.php:123
* @route '/pegawai/{pegawai}/revoke-user'
*/
const revokeUserForm = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revokeUser.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::revokeUser
* @see app/Http/Controllers/PegawaiController.php:123
* @route '/pegawai/{pegawai}/revoke-user'
*/
revokeUserForm.delete = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: revokeUser.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

revokeUser.form = revokeUserForm

/**
* @see \App\Http\Controllers\PegawaiController::assignRfid
* @see app/Http/Controllers/PegawaiController.php:134
* @route '/pegawai/{pegawai}/assign-rfid'
*/
export const assignRfid = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignRfid.url(args, options),
    method: 'post',
})

assignRfid.definition = {
    methods: ["post"],
    url: '/pegawai/{pegawai}/assign-rfid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PegawaiController::assignRfid
* @see app/Http/Controllers/PegawaiController.php:134
* @route '/pegawai/{pegawai}/assign-rfid'
*/
assignRfid.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return assignRfid.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::assignRfid
* @see app/Http/Controllers/PegawaiController.php:134
* @route '/pegawai/{pegawai}/assign-rfid'
*/
assignRfid.post = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignRfid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::assignRfid
* @see app/Http/Controllers/PegawaiController.php:134
* @route '/pegawai/{pegawai}/assign-rfid'
*/
const assignRfidForm = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignRfid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::assignRfid
* @see app/Http/Controllers/PegawaiController.php:134
* @route '/pegawai/{pegawai}/assign-rfid'
*/
assignRfidForm.post = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignRfid.url(args, options),
    method: 'post',
})

assignRfid.form = assignRfidForm

/**
* @see \App\Http\Controllers\PegawaiController::destroy
* @see app/Http/Controllers/PegawaiController.php:76
* @route '/pegawai/{pegawai}'
*/
export const destroy = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/pegawai/{pegawai}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PegawaiController::destroy
* @see app/Http/Controllers/PegawaiController.php:76
* @route '/pegawai/{pegawai}'
*/
destroy.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return destroy.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PegawaiController::destroy
* @see app/Http/Controllers/PegawaiController.php:76
* @route '/pegawai/{pegawai}'
*/
destroy.delete = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PegawaiController::destroy
* @see app/Http/Controllers/PegawaiController.php:76
* @route '/pegawai/{pegawai}'
*/
const destroyForm = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PegawaiController::destroy
* @see app/Http/Controllers/PegawaiController.php:76
* @route '/pegawai/{pegawai}'
*/
destroyForm.delete = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PegawaiController = { index, store, update, assignUser, revokeUser, assignRfid, destroy }

export default PegawaiController