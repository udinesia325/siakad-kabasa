import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/ppdb/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
const pageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
pageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: page.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:66
* @route '/ppdb/create'
*/
pageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: page.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

page.form = pageForm

const create = {
    page: Object.assign(page, page),
}

export default create