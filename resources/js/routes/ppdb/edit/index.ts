import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
export const page = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(args, options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/ppdb/{ppdb}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
page.url = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ppdb: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ppdb: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ppdb: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ppdb: typeof args.ppdb === 'object'
        ? args.ppdb.id
        : args.ppdb,
    }

    return page.definition.url
            .replace('{ppdb}', parsedArgs.ppdb.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
page.get = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
page.head = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
const pageForm = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: page.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
pageForm.get = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: page.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PpdbController::page
* @see app/Http/Controllers/PpdbController.php:74
* @route '/ppdb/{ppdb}/edit'
*/
pageForm.head = (args: { ppdb: number | { id: number } } | [ppdb: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: page.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

page.form = pageForm

const edit = {
    page: Object.assign(page, page),
}

export default edit