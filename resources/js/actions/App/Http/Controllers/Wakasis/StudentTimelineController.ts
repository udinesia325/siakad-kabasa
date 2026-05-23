import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
const StudentTimelineController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: StudentTimelineController.url(options),
    method: 'get',
})

StudentTimelineController.definition = {
    methods: ["get","head"],
    url: '/wakasis/student-timeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
StudentTimelineController.url = (options?: RouteQueryOptions) => {
    return StudentTimelineController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
StudentTimelineController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: StudentTimelineController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
StudentTimelineController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: StudentTimelineController.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
const StudentTimelineControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StudentTimelineController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
StudentTimelineControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StudentTimelineController.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\StudentTimelineController::__invoke
* @see app/Http/Controllers/Wakasis/StudentTimelineController.php:18
* @route '/wakasis/student-timeline'
*/
StudentTimelineControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: StudentTimelineController.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

StudentTimelineController.form = StudentTimelineControllerForm

export default StudentTimelineController