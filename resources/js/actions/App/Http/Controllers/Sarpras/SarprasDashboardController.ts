import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
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

export default SarprasDashboardController