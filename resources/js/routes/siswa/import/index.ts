import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:120
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
* @see app/Http/Controllers/SiswaController.php:120
* @route '/siswa/import/template'
*/
template.url = (options?: RouteQueryOptions) => {
    return template.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:120
* @route '/siswa/import/template'
*/
template.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:120
* @route '/siswa/import/template'
*/
template.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:120
* @route '/siswa/import/template'
*/
const templateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: template.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:120
* @route '/siswa/import/template'
*/
templateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: template.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SiswaController::template
* @see app/Http/Controllers/SiswaController.php:120
* @route '/siswa/import/template'
*/
templateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: template.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

template.form = templateForm

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:125
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
* @see app/Http/Controllers/SiswaController.php:125
* @route '/siswa/import/preview'
*/
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:125
* @route '/siswa/import/preview'
*/
preview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:125
* @route '/siswa/import/preview'
*/
const previewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: preview.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::preview
* @see app/Http/Controllers/SiswaController.php:125
* @route '/siswa/import/preview'
*/
previewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: preview.url(options),
    method: 'post',
})

preview.form = previewForm

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:149
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
* @see app/Http/Controllers/SiswaController.php:149
* @route '/siswa/import/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:149
* @route '/siswa/import/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:149
* @route '/siswa/import/store'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SiswaController::store
* @see app/Http/Controllers/SiswaController.php:149
* @route '/siswa/import/store'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const importMethod = {
    template: Object.assign(template, template),
    preview: Object.assign(preview, preview),
    store: Object.assign(store, store),
}

export default importMethod