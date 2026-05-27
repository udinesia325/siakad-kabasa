import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
export const buat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buat.url(options),
    method: 'get',
})

buat.definition = {
    methods: ["get","head"],
    url: '/jurnal/buat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
buat.url = (options?: RouteQueryOptions) => {
    return buat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
buat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
buat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: buat.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
const buatForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
buatForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buat.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::buat
* @see app/Http/Controllers/JurnalController.php:27
* @route '/jurnal/buat'
*/
buatForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buat.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

buat.form = buatForm

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
export const buatSlot = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buatSlot.url(args, options),
    method: 'get',
})

buatSlot.definition = {
    methods: ["get","head"],
    url: '/jurnal/buat/{jadwalMengajar}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
buatSlot.url = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalMengajar: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jadwalMengajar: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jadwalMengajar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jadwalMengajar: typeof args.jadwalMengajar === 'object'
        ? args.jadwalMengajar.id
        : args.jadwalMengajar,
    }

    return buatSlot.definition.url
            .replace('{jadwalMengajar}', parsedArgs.jadwalMengajar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
buatSlot.get = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: buatSlot.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
buatSlot.head = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: buatSlot.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
const buatSlotForm = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buatSlot.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
buatSlotForm.get = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buatSlot.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::buatSlot
* @see app/Http/Controllers/JurnalController.php:77
* @route '/jurnal/buat/{jadwalMengajar}'
*/
buatSlotForm.head = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: buatSlot.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

buatSlot.form = buatSlotForm

/**
* @see \App\Http\Controllers\JurnalController::store
* @see app/Http/Controllers/JurnalController.php:165
* @route '/jurnal/{jadwalMengajar}'
*/
export const store = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/jurnal/{jadwalMengajar}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JurnalController::store
* @see app/Http/Controllers/JurnalController.php:165
* @route '/jurnal/{jadwalMengajar}'
*/
store.url = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jadwalMengajar: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jadwalMengajar: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jadwalMengajar: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jadwalMengajar: typeof args.jadwalMengajar === 'object'
        ? args.jadwalMengajar.id
        : args.jadwalMengajar,
    }

    return store.definition.url
            .replace('{jadwalMengajar}', parsedArgs.jadwalMengajar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JurnalController::store
* @see app/Http/Controllers/JurnalController.php:165
* @route '/jurnal/{jadwalMengajar}'
*/
store.post = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JurnalController::store
* @see app/Http/Controllers/JurnalController.php:165
* @route '/jurnal/{jadwalMengajar}'
*/
const storeForm = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JurnalController::store
* @see app/Http/Controllers/JurnalController.php:165
* @route '/jurnal/{jadwalMengajar}'
*/
storeForm.post = (args: { jadwalMengajar: number | { id: number } } | [jadwalMengajar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\JurnalController::update
* @see app/Http/Controllers/JurnalController.php:205
* @route '/jurnal/{jurnal}'
*/
export const update = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/jurnal/{jurnal}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\JurnalController::update
* @see app/Http/Controllers/JurnalController.php:205
* @route '/jurnal/{jurnal}'
*/
update.url = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jurnal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jurnal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jurnal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jurnal: typeof args.jurnal === 'object'
        ? args.jurnal.id
        : args.jurnal,
    }

    return update.definition.url
            .replace('{jurnal}', parsedArgs.jurnal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JurnalController::update
* @see app/Http/Controllers/JurnalController.php:205
* @route '/jurnal/{jurnal}'
*/
update.put = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\JurnalController::update
* @see app/Http/Controllers/JurnalController.php:205
* @route '/jurnal/{jurnal}'
*/
const updateForm = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\JurnalController::update
* @see app/Http/Controllers/JurnalController.php:205
* @route '/jurnal/{jurnal}'
*/
updateForm.put = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jurnal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::index
* @see app/Http/Controllers/JurnalController.php:236
* @route '/jurnal'
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
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
export const show = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/jurnal/{jurnal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
show.url = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { jurnal: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { jurnal: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            jurnal: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        jurnal: typeof args.jurnal === 'object'
        ? args.jurnal.id
        : args.jurnal,
    }

    return show.definition.url
            .replace('{jurnal}', parsedArgs.jurnal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
show.get = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
show.head = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
const showForm = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
showForm.get = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\JurnalController::show
* @see app/Http/Controllers/JurnalController.php:325
* @route '/jurnal/{jurnal}'
*/
showForm.head = (args: { jurnal: number | { id: number } } | [jurnal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const JurnalController = { buat, buatSlot, store, update, index, show }

export default JurnalController