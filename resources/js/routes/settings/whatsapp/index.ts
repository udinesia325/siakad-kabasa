import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/settings/whatsapp/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::restart
* @see app/Http/Controllers/Settings/WhatsappController.php:97
* @route '/settings/whatsapp/restart'
*/
export const restart = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restart.url(options),
    method: 'post',
})

restart.definition = {
    methods: ["post"],
    url: '/settings/whatsapp/restart',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::restart
* @see app/Http/Controllers/Settings/WhatsappController.php:97
* @route '/settings/whatsapp/restart'
*/
restart.url = (options?: RouteQueryOptions) => {
    return restart.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::restart
* @see app/Http/Controllers/Settings/WhatsappController.php:97
* @route '/settings/whatsapp/restart'
*/
restart.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restart.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::stop
* @see app/Http/Controllers/Settings/WhatsappController.php:108
* @route '/settings/whatsapp/stop'
*/
export const stop = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(options),
    method: 'post',
})

stop.definition = {
    methods: ["post"],
    url: '/settings/whatsapp/stop',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::stop
* @see app/Http/Controllers/Settings/WhatsappController.php:108
* @route '/settings/whatsapp/stop'
*/
stop.url = (options?: RouteQueryOptions) => {
    return stop.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::stop
* @see app/Http/Controllers/Settings/WhatsappController.php:108
* @route '/settings/whatsapp/stop'
*/
stop.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stop.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::logout
* @see app/Http/Controllers/Settings/WhatsappController.php:119
* @route '/settings/whatsapp/logout'
*/
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/settings/whatsapp/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::logout
* @see app/Http/Controllers/Settings/WhatsappController.php:119
* @route '/settings/whatsapp/logout'
*/
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::logout
* @see app/Http/Controllers/Settings/WhatsappController.php:119
* @route '/settings/whatsapp/logout'
*/
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::reconnect
* @see app/Http/Controllers/Settings/WhatsappController.php:130
* @route '/settings/whatsapp/reconnect'
*/
export const reconnect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reconnect.url(options),
    method: 'post',
})

reconnect.definition = {
    methods: ["post"],
    url: '/settings/whatsapp/reconnect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::reconnect
* @see app/Http/Controllers/Settings/WhatsappController.php:130
* @route '/settings/whatsapp/reconnect'
*/
reconnect.url = (options?: RouteQueryOptions) => {
    return reconnect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::reconnect
* @see app/Http/Controllers/Settings/WhatsappController.php:130
* @route '/settings/whatsapp/reconnect'
*/
reconnect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reconnect.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
export const qr = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(options),
    method: 'get',
})

qr.definition = {
    methods: ["get","head"],
    url: '/settings/whatsapp/qr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
qr.url = (options?: RouteQueryOptions) => {
    return qr.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
qr.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qr.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
qr.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: qr.url(options),
    method: 'head',
})

const whatsapp = {
    status: Object.assign(status, status),
    restart: Object.assign(restart, restart),
    stop: Object.assign(stop, stop),
    logout: Object.assign(logout, logout),
    reconnect: Object.assign(reconnect, reconnect),
    qr: Object.assign(qr, qr),
}

export default whatsapp