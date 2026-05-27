import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/whatsapp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::index
* @see app/Http/Controllers/Settings/WhatsappController.php:19
* @route '/settings/whatsapp'
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
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
statusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::status
* @see app/Http/Controllers/Settings/WhatsappController.php:70
* @route '/settings/whatsapp/status'
*/
statusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

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
* @see \App\Http\Controllers\Settings\WhatsappController::restart
* @see app/Http/Controllers/Settings/WhatsappController.php:97
* @route '/settings/whatsapp/restart'
*/
const restartForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restart.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::restart
* @see app/Http/Controllers/Settings/WhatsappController.php:97
* @route '/settings/whatsapp/restart'
*/
restartForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restart.url(options),
    method: 'post',
})

restart.form = restartForm

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
* @see \App\Http\Controllers\Settings\WhatsappController::stop
* @see app/Http/Controllers/Settings/WhatsappController.php:108
* @route '/settings/whatsapp/stop'
*/
const stopForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stop.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::stop
* @see app/Http/Controllers/Settings/WhatsappController.php:108
* @route '/settings/whatsapp/stop'
*/
stopForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: stop.url(options),
    method: 'post',
})

stop.form = stopForm

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
* @see \App\Http\Controllers\Settings\WhatsappController::logout
* @see app/Http/Controllers/Settings/WhatsappController.php:119
* @route '/settings/whatsapp/logout'
*/
const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::logout
* @see app/Http/Controllers/Settings/WhatsappController.php:119
* @route '/settings/whatsapp/logout'
*/
logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
})

logout.form = logoutForm

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
* @see \App\Http\Controllers\Settings\WhatsappController::reconnect
* @see app/Http/Controllers/Settings/WhatsappController.php:130
* @route '/settings/whatsapp/reconnect'
*/
const reconnectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reconnect.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::reconnect
* @see app/Http/Controllers/Settings/WhatsappController.php:130
* @route '/settings/whatsapp/reconnect'
*/
reconnectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reconnect.url(options),
    method: 'post',
})

reconnect.form = reconnectForm

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

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
const qrForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: qr.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
qrForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: qr.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\WhatsappController::qr
* @see app/Http/Controllers/Settings/WhatsappController.php:141
* @route '/settings/whatsapp/qr'
*/
qrForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: qr.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

qr.form = qrForm

const WhatsappController = { index, status, restart, stop, logout, reconnect, qr }

export default WhatsappController