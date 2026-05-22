import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ServerMonitorController::index
* @see app/Http/Controllers/ServerMonitorController.php:13
* @route '/sistem/server-monitor'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sistem/server-monitor',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServerMonitorController::index
* @see app/Http/Controllers/ServerMonitorController.php:13
* @route '/sistem/server-monitor'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServerMonitorController::index
* @see app/Http/Controllers/ServerMonitorController.php:13
* @route '/sistem/server-monitor'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ServerMonitorController::index
* @see app/Http/Controllers/ServerMonitorController.php:13
* @route '/sistem/server-monitor'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ServerMonitorController::stats
* @see app/Http/Controllers/ServerMonitorController.php:18
* @route '/sistem/server-monitor/stats'
*/
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/sistem/server-monitor/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ServerMonitorController::stats
* @see app/Http/Controllers/ServerMonitorController.php:18
* @route '/sistem/server-monitor/stats'
*/
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ServerMonitorController::stats
* @see app/Http/Controllers/ServerMonitorController.php:18
* @route '/sistem/server-monitor/stats'
*/
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ServerMonitorController::stats
* @see app/Http/Controllers/ServerMonitorController.php:18
* @route '/sistem/server-monitor/stats'
*/
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

const ServerMonitorController = { index, stats }

export default ServerMonitorController