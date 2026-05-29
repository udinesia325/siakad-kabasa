import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\SiaranWhatsappController::index
 * @route '/siaran-whatsapp'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get", "head"],
    url: '/siaran-whatsapp',
} satisfies RouteDefinition<["get", "head"]>

index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

index.form = indexForm

/**
 * @see \App\Http\Controllers\SiaranWhatsappController::siswa
 * @route '/siaran-whatsapp/siswa'
 */
export const siswa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: siswa.url(options),
    method: 'get',
})

siswa.definition = {
    methods: ["get", "head"],
    url: '/siaran-whatsapp/siswa',
} satisfies RouteDefinition<["get", "head"]>

siswa.url = (options?: RouteQueryOptions) => {
    return siswa.definition.url + queryParams(options)
}

siswa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: siswa.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\SiaranWhatsappController::kirim
 * @route '/siaran-whatsapp/kirim'
 */
export const kirim = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirim.url(options),
    method: 'post',
})

kirim.definition = {
    methods: ["post"],
    url: '/siaran-whatsapp/kirim',
} satisfies RouteDefinition<["post"]>

kirim.url = (options?: RouteQueryOptions) => {
    return kirim.definition.url + queryParams(options)
}

kirim.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: kirim.url(options),
    method: 'post',
})

const kirimForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: kirim.url(options),
    method: 'post',
})

kirimForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: kirim.url(options),
    method: 'post',
})

kirim.form = kirimForm

const siaranWhatsapp = {
    index,
    siswa,
    kirim,
}

export default siaranWhatsapp
