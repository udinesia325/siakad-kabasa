import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/wakasis/surat-peringatan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::index
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:15
* @route '/wakasis/surat-peringatan'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::validate
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:47
* @route '/wakasis/surat-peringatan/{suratPeringatan}/validate'
*/
export const validate = (args: { suratPeringatan: number | { id: number } } | [suratPeringatan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(args, options),
    method: 'post',
})

validate.definition = {
    methods: ["post"],
    url: '/wakasis/surat-peringatan/{suratPeringatan}/validate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::validate
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:47
* @route '/wakasis/surat-peringatan/{suratPeringatan}/validate'
*/
validate.url = (args: { suratPeringatan: number | { id: number } } | [suratPeringatan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { suratPeringatan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { suratPeringatan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            suratPeringatan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        suratPeringatan: typeof args.suratPeringatan === 'object'
        ? args.suratPeringatan.id
        : args.suratPeringatan,
    }

    return validate.definition.url
            .replace('{suratPeringatan}', parsedArgs.suratPeringatan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::validate
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:47
* @route '/wakasis/surat-peringatan/{suratPeringatan}/validate'
*/
validate.post = (args: { suratPeringatan: number | { id: number } } | [suratPeringatan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::validate
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:47
* @route '/wakasis/surat-peringatan/{suratPeringatan}/validate'
*/
const validateForm = (args: { suratPeringatan: number | { id: number } } | [suratPeringatan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Wakasis\SuratPeringatanController::validate
* @see app/Http/Controllers/Wakasis/SuratPeringatanController.php:47
* @route '/wakasis/surat-peringatan/{suratPeringatan}/validate'
*/
validateForm.post = (args: { suratPeringatan: number | { id: number } } | [suratPeringatan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validate.url(args, options),
    method: 'post',
})

validate.form = validateForm

const suratPeringatan = {
    index: Object.assign(index, index),
    validate: Object.assign(validate, validate),
}

export default suratPeringatan