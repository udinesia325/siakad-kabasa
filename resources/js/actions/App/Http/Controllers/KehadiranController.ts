import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
    applyUrlDefaults,
} from './../../../../wayfinder';
/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/kehadiran',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\KehadiranController::index
 * @see app/Http/Controllers/KehadiranController.php:28
 * @route '/kehadiran'
 */
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

index.form = indexForm;

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
export const show = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
});

show.definition = {
    methods: ['get', 'head'],
    url: '/kehadiran/{kelas}',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
show.url = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelas: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelas: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            kelas: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        kelas: typeof args.kelas === 'object' ? args.kelas.id : args.kelas,
    };

    return (
        show.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
show.get = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
show.head = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
const showForm = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
showForm.get = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\KehadiranController::show
 * @see app/Http/Controllers/KehadiranController.php:45
 * @route '/kehadiran/{kelas}'
 */
showForm.head = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

show.form = showForm;

/**
 * @see \App\Http\Controllers\KehadiranController::anulir
 * @see app/Http/Controllers/KehadiranController.php:193
 * @route '/kehadiran/{kelas}/anulir'
 */
export const anulir = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: anulir.url(args, options),
    method: 'post',
});

anulir.definition = {
    methods: ['post'],
    url: '/kehadiran/{kelas}/anulir',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\KehadiranController::anulir
 * @see app/Http/Controllers/KehadiranController.php:193
 * @route '/kehadiran/{kelas}/anulir'
 */
anulir.url = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kelas: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { kelas: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            kelas: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        kelas: typeof args.kelas === 'object' ? args.kelas.id : args.kelas,
    };

    return (
        anulir.definition.url
            .replace('{kelas}', parsedArgs.kelas.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\KehadiranController::anulir
 * @see app/Http/Controllers/KehadiranController.php:193
 * @route '/kehadiran/{kelas}/anulir'
 */
anulir.post = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: anulir.url(args, options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\KehadiranController::anulir
 * @see app/Http/Controllers/KehadiranController.php:193
 * @route '/kehadiran/{kelas}/anulir'
 */
const anulirForm = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: anulir.url(args, options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\KehadiranController::anulir
 * @see app/Http/Controllers/KehadiranController.php:193
 * @route '/kehadiran/{kelas}/anulir'
 */
anulirForm.post = (
    args:
        | { kelas: number | { id: number } }
        | [kelas: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: anulir.url(args, options),
    method: 'post',
});

anulir.form = anulirForm;

const KehadiranController = { index, show, anulir };

export default KehadiranController;
