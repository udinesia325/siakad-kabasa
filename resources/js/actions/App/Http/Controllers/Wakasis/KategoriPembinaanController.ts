import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/kategori-pembinaan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::index
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:14
* @route '/wakasis/kategori-pembinaan'
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
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::store
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:28
* @route '/wakasis/kategori-pembinaan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wakasis/kategori-pembinaan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::store
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:28
* @route '/wakasis/kategori-pembinaan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::store
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:28
* @route '/wakasis/kategori-pembinaan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::store
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:28
* @route '/wakasis/kategori-pembinaan'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::store
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:28
* @route '/wakasis/kategori-pembinaan'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
const updatedcf85f8d0b90f5590a7778c419eacdf6 = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, options),
    method: 'put',
})

updatedcf85f8d0b90f5590a7778c419eacdf6.definition = {
    methods: ["put"],
    url: '/wakasis/kategori-pembinaan/{kategoriPembinaan}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
updatedcf85f8d0b90f5590a7778c419eacdf6.url = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategoriPembinaan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategoriPembinaan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategoriPembinaan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategoriPembinaan: typeof args.kategoriPembinaan === 'object'
        ? args.kategoriPembinaan.id
        : args.kategoriPembinaan,
    }

    return updatedcf85f8d0b90f5590a7778c419eacdf6.definition.url
            .replace('{kategoriPembinaan}', parsedArgs.kategoriPembinaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
updatedcf85f8d0b90f5590a7778c419eacdf6.put = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
const updatedcf85f8d0b90f5590a7778c419eacdf6Form = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
updatedcf85f8d0b90f5590a7778c419eacdf6Form.put = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatedcf85f8d0b90f5590a7778c419eacdf6.form = updatedcf85f8d0b90f5590a7778c419eacdf6Form
/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
const updatedcf85f8d0b90f5590a7778c419eacdf6 = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, options),
    method: 'patch',
})

updatedcf85f8d0b90f5590a7778c419eacdf6.definition = {
    methods: ["patch"],
    url: '/wakasis/kategori-pembinaan/{kategoriPembinaan}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
updatedcf85f8d0b90f5590a7778c419eacdf6.url = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategoriPembinaan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategoriPembinaan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategoriPembinaan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategoriPembinaan: typeof args.kategoriPembinaan === 'object'
        ? args.kategoriPembinaan.id
        : args.kategoriPembinaan,
    }

    return updatedcf85f8d0b90f5590a7778c419eacdf6.definition.url
            .replace('{kategoriPembinaan}', parsedArgs.kategoriPembinaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
updatedcf85f8d0b90f5590a7778c419eacdf6.patch = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
const updatedcf85f8d0b90f5590a7778c419eacdf6Form = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::update
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:41
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
updatedcf85f8d0b90f5590a7778c419eacdf6Form.patch = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatedcf85f8d0b90f5590a7778c419eacdf6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatedcf85f8d0b90f5590a7778c419eacdf6.form = updatedcf85f8d0b90f5590a7778c419eacdf6Form

export const update = {
    '/wakasis/kategori-pembinaan/{kategoriPembinaan}': updatedcf85f8d0b90f5590a7778c419eacdf6,
    '/wakasis/kategori-pembinaan/{kategoriPembinaan}': updatedcf85f8d0b90f5590a7778c419eacdf6,
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:54
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
export const destroy = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/wakasis/kategori-pembinaan/{kategoriPembinaan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:54
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
destroy.url = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kategoriPembinaan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kategoriPembinaan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kategoriPembinaan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kategoriPembinaan: typeof args.kategoriPembinaan === 'object'
        ? args.kategoriPembinaan.id
        : args.kategoriPembinaan,
    }

    return destroy.definition.url
            .replace('{kategoriPembinaan}', parsedArgs.kategoriPembinaan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:54
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
destroy.delete = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:54
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
const destroyForm = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\KategoriPembinaanController::destroy
* @see app/Http/Controllers/Wakasis/KategoriPembinaanController.php:54
* @route '/wakasis/kategori-pembinaan/{kategoriPembinaan}'
*/
destroyForm.delete = (args: { kategoriPembinaan: number | { id: number } } | [kategoriPembinaan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const KategoriPembinaanController = { index, store, update, destroy }

export default KategoriPembinaanController