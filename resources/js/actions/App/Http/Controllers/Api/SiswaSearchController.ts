import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
const SiswaSearchController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SiswaSearchController.url(options),
    method: 'get',
})

SiswaSearchController.definition = {
    methods: ["get","head"],
    url: '/api/siswa/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
SiswaSearchController.url = (options?: RouteQueryOptions) => {
    return SiswaSearchController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
SiswaSearchController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SiswaSearchController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
SiswaSearchController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SiswaSearchController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
const SiswaSearchControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: SiswaSearchController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
SiswaSearchControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: SiswaSearchController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
SiswaSearchControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: SiswaSearchController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

SiswaSearchController.form = SiswaSearchControllerForm

export default SiswaSearchController