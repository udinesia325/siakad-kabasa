import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
const WakasisDashboardController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: WakasisDashboardController.url(options),
    method: 'get',
})

WakasisDashboardController.definition = {
    methods: ["get","head"],
    url: '/wakasis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
WakasisDashboardController.url = (options?: RouteQueryOptions) => {
    return WakasisDashboardController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
WakasisDashboardController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: WakasisDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
WakasisDashboardController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: WakasisDashboardController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
const WakasisDashboardControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: WakasisDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
WakasisDashboardControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: WakasisDashboardController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\WakasisDashboardController::__invoke
* @see app/Http/Controllers/Wakasis/WakasisDashboardController.php:16
* @route '/wakasis'
*/
WakasisDashboardControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: WakasisDashboardController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

WakasisDashboardController.form = WakasisDashboardControllerForm

export default WakasisDashboardController