import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
export const template = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/siswa/import/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
template.url = (options?: RouteQueryOptions) => {
    return template.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
template.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:128
* @route '/siswa/import/template'
*/
template.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:133
* @route '/siswa/import/preview'
*/
export const preview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/siswa/import/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:133
* @route '/siswa/import/preview'
*/
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:133
* @route '/siswa/import/preview'
*/
preview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:157
* @route '/siswa/import/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/siswa/import/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:157
* @route '/siswa/import/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:157
* @route '/siswa/import/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

const importMethod = {
    template: Object.assign(template, template),
    preview: Object.assign(preview, preview),
    store: Object.assign(store, store),
}

export default importMethod