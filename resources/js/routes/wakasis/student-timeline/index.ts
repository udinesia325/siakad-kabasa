import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/student-timeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const studentTimeline = {
    index: Object.assign(index, index),
}

export default studentTimeline