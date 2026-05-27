import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/siswa/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\SiswaSearchController::__invoke
* @see app/Http/Controllers/Api/SiswaSearchController.php:12
* @route '/api/siswa/search'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

const siswa = {
    search: Object.assign(search, search),
}

export default siswa