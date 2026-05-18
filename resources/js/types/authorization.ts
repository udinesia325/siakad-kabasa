export type ModuleType = 'crud' | 'single' | 'custom';

export type Module = {
    key: string;
    label: string;
    group: string;
    icon: string;
    route: string;
    type: ModuleType;
    actions: string[] | null;
    sidebar: boolean;
    resolved_actions?: string[];
};

export type MatrixData = Record<string, Module[]>;
