import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/jadwal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::index
* @see app/Http/Controllers/Publik/JadwalPublikController.php:19
* @route '/jadwal'
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
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
export const kelasIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kelasIndex.url(options),
    method: 'get',
})

kelasIndex.definition = {
    methods: ["get","head"],
    url: '/jadwal/kelas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
kelasIndex.url = (options?: RouteQueryOptions) => {
    return kelasIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
kelasIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kelasIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
kelasIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kelasIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
const kelasIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: kelasIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
kelasIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: kelasIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:27
* @route '/jadwal/kelas'
*/
kelasIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: kelasIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

kelasIndex.form = kelasIndexForm

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
export const kelasShow = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kelasShow.url(args, options),
    method: 'get',
})

kelasShow.definition = {
    methods: ["get","head"],
    url: '/jadwal/kelas/{kelas}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
kelasShow.url = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelas: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelas: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            kelas: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        kelas: typeof args.kelas === 'object'
        ? args.kelas.id
        : args.kelas,
    }

    return kelasShow.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
kelasShow.get = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: kelasShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
kelasShow.head = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: kelasShow.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
const kelasShowForm = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: kelasShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
kelasShowForm.get = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: kelasShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::kelasShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:42
* @route '/jadwal/kelas/{kelas}'
*/
kelasShowForm.head = (args: { kelas: number | { id: number } } | [kelas: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: kelasShow.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

kelasShow.form = kelasShowForm

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
export const guruIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: guruIndex.url(options),
    method: 'get',
})

guruIndex.definition = {
    methods: ["get","head"],
    url: '/jadwal/guru',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
guruIndex.url = (options?: RouteQueryOptions) => {
    return guruIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
guruIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: guruIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
guruIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: guruIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
const guruIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: guruIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
guruIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: guruIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruIndex
* @see app/Http/Controllers/Publik/JadwalPublikController.php:72
* @route '/jadwal/guru'
*/
guruIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: guruIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

guruIndex.form = guruIndexForm

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
export const guruShow = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: guruShow.url(args, options),
    method: 'get',
})

guruShow.definition = {
    methods: ["get","head"],
    url: '/jadwal/guru/{pegawai}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
guruShow.url = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pegawai: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pegawai: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pegawai: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pegawai: typeof args.pegawai === 'object'
        ? args.pegawai.id
        : args.pegawai,
    }

    return guruShow.definition.url
            .replace('{pegawai}', parsedArgs.pegawai.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
guruShow.get = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: guruShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
guruShow.head = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: guruShow.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
const guruShowForm = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: guruShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
guruShowForm.get = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: guruShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Publik\JadwalPublikController::guruShow
* @see app/Http/Controllers/Publik/JadwalPublikController.php:99
* @route '/jadwal/guru/{pegawai}'
*/
guruShowForm.head = (args: { pegawai: number | { id: number } } | [pegawai: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: guruShow.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

guruShow.form = guruShowForm

const JadwalPublikController = { index, kelasIndex, kelasShow, guruIndex, guruShow }

export default JadwalPublikController