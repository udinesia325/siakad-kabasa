import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
const SarprasDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SarprasDashboardController.url(options),
    method: 'get',
})

SarprasDashboardController.definition = {
    methods: ["get","head"],
    url: '/sarpras',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
SarprasDashboardController.url = (options?: RouteQueryOptions) => {
    return SarprasDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
SarprasDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: SarprasDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
SarprasDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: SarprasDashboardController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
const SarprasDashboardControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: SarprasDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
SarprasDashboardControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: SarprasDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\SarprasDashboardController::__invoke
* @see app/Http/Controllers/Sarpras/SarprasDashboardController.php:17
* @route '/sarpras'
*/
SarprasDashboardControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: SarprasDashboardController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

SarprasDashboardController.form = SarprasDashboardControllerForm

export default SarprasDashboardController