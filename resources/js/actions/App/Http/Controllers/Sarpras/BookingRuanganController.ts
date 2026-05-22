import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::index
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:15
* @route '/sarpras/booking-ruangan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sarpras/booking-ruangan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::index
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:15
* @route '/sarpras/booking-ruangan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::index
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:15
* @route '/sarpras/booking-ruangan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::index
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:15
* @route '/sarpras/booking-ruangan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::store
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:40
* @route '/sarpras/booking-ruangan'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sarpras/booking-ruangan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::store
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:40
* @route '/sarpras/booking-ruangan'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::store
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:40
* @route '/sarpras/booking-ruangan'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::approve
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:71
* @route '/sarpras/booking-ruangan/{bookingRuangan}/approve'
*/
export const approve = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/sarpras/booking-ruangan/{bookingRuangan}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::approve
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:71
* @route '/sarpras/booking-ruangan/{bookingRuangan}/approve'
*/
approve.url = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookingRuangan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bookingRuangan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bookingRuangan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bookingRuangan: typeof args.bookingRuangan === 'object'
        ? args.bookingRuangan.id
        : args.bookingRuangan,
    }

    return approve.definition.url
            .replace('{bookingRuangan}', parsedArgs.bookingRuangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::approve
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:71
* @route '/sarpras/booking-ruangan/{bookingRuangan}/approve'
*/
approve.post = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::reject
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:81
* @route '/sarpras/booking-ruangan/{bookingRuangan}/reject'
*/
export const reject = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/sarpras/booking-ruangan/{bookingRuangan}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::reject
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:81
* @route '/sarpras/booking-ruangan/{bookingRuangan}/reject'
*/
reject.url = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookingRuangan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bookingRuangan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bookingRuangan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bookingRuangan: typeof args.bookingRuangan === 'object'
        ? args.bookingRuangan.id
        : args.bookingRuangan,
    }

    return reject.definition.url
            .replace('{bookingRuangan}', parsedArgs.bookingRuangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::reject
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:81
* @route '/sarpras/booking-ruangan/{bookingRuangan}/reject'
*/
reject.post = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::selesai
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:91
* @route '/sarpras/booking-ruangan/{bookingRuangan}/selesai'
*/
export const selesai = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selesai.url(args, options),
    method: 'post',
})

selesai.definition = {
    methods: ["post"],
    url: '/sarpras/booking-ruangan/{bookingRuangan}/selesai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::selesai
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:91
* @route '/sarpras/booking-ruangan/{bookingRuangan}/selesai'
*/
selesai.url = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookingRuangan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bookingRuangan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bookingRuangan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bookingRuangan: typeof args.bookingRuangan === 'object'
        ? args.bookingRuangan.id
        : args.bookingRuangan,
    }

    return selesai.definition.url
            .replace('{bookingRuangan}', parsedArgs.bookingRuangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::selesai
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:91
* @route '/sarpras/booking-ruangan/{bookingRuangan}/selesai'
*/
selesai.post = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: selesai.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::destroy
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:101
* @route '/sarpras/booking-ruangan/{bookingRuangan}'
*/
export const destroy = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sarpras/booking-ruangan/{bookingRuangan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::destroy
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:101
* @route '/sarpras/booking-ruangan/{bookingRuangan}'
*/
destroy.url = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bookingRuangan: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { bookingRuangan: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            bookingRuangan: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        bookingRuangan: typeof args.bookingRuangan === 'object'
        ? args.bookingRuangan.id
        : args.bookingRuangan,
    }

    return destroy.definition.url
            .replace('{bookingRuangan}', parsedArgs.bookingRuangan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Sarpras\BookingRuanganController::destroy
* @see app/Http/Controllers/Sarpras/BookingRuanganController.php:101
* @route '/sarpras/booking-ruangan/{bookingRuangan}'
*/
destroy.delete = (args: { bookingRuangan: number | { id: number } } | [bookingRuangan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const BookingRuanganController = { index, store, approve, reject, selesai, destroy }

export default BookingRuanganController