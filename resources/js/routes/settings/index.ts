import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import whatsapp3e1f7f from './whatsapp'
/**
* @see \App\Http\Controllers\Settings\WhatsappController::whatsapp
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
export const whatsapp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: whatsapp.url(options),
    method: 'get',
})

whatsapp.definition = {
    methods: ["get","head"],
    url: '/settings/whatsapp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::whatsapp
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
whatsapp.url = (options?: RouteQueryOptions) => {
    return whatsapp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::whatsapp
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
whatsapp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: whatsapp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::whatsapp
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
whatsapp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: whatsapp.url(options),
    method: 'head',
})

const settings = {
    whatsapp: Object.assign(whatsapp, whatsapp3e1f7f),
}

export default settings