import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/kategori-prestasi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::index
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:14
* @route '/wakasis/kategori-prestasi'
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
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::store
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:32
* @route '/wakasis/kategori-prestasi'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/kategori-prestasi',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::store
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:32
* @route '/wakasis/kategori-prestasi'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::store
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:32
* @route '/wakasis/kategori-prestasi'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::store
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:32
* @route '/wakasis/kategori-prestasi'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::store
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:32
* @route '/wakasis/kategori-prestasi'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::update
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:46
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
export const update = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/wakasis/kategori-prestasi/{kategoriPrestasi}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::update
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:46
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
update.url = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategoriPrestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategoriPrestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategoriPrestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategoriPrestasi: typeof args.kategoriPrestasi === 'object'
        ? args.kategoriPrestasi.id
        : args.kategoriPrestasi,
    }

    return update.definition.url
            .replace('{kategoriPrestasi}', parsedArgs.kategoriPrestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::update
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:46
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
update.patch = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::update
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:46
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
const updateForm = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::update
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:46
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
updateForm.patch = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:60
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
export const destroy = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/kategori-prestasi/{kategoriPrestasi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:60
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
destroy.url = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategoriPrestasi: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategoriPrestasi: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategoriPrestasi: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategoriPrestasi: typeof args.kategoriPrestasi === 'object'
        ? args.kategoriPrestasi.id
        : args.kategoriPrestasi,
    }

    return destroy.definition.url
            .replace('{kategoriPrestasi}', parsedArgs.kategoriPrestasi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:60
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
destroy.delete = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:60
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
const destroyForm = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPrestasiController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPrestasiController.php:60
* @route '/wakasis/kategori-prestasi/{kategoriPrestasi}'
*/
destroyForm.delete = (args: { kategoriPrestasi: number | { id: number } } | [kategoriPrestasi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const kategoriPrestasi = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default kategoriPrestasi