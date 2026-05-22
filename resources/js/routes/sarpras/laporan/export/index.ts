import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
export const excel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

excel.definition = {
    methods: ["get","head"],
    url: '/sarpras/laporan/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
excel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
excel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: excel.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
const excelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: excel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
excelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: excel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::excel
* @see app/Http/Controllers/Sarpras/LaporanController.php:33
* @route '/sarpras/laporan/export/excel'
*/
excelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: excel.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

excel.form = excelForm

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/sarpras/laporan/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
pdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\LaporanController::pdf
* @see app/Http/Controllers/Sarpras/LaporanController.php:53
* @route '/sarpras/laporan/export/pdf'
*/
pdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdf.form = pdfForm

const exportMethod = {
    excel: Object.assign(excel, excel),
    pdf: Object.assign(pdf, pdf),
}

export default exportMethod