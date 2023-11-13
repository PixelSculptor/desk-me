import { UNAUTHORIZED_ROUTES } from '@/types/Routes';
import { ReactNode } from 'react';

export type ComponentRouteProps<Props> = {
    Component: React.ComponentType<PropsWithOptionalChildren<Props>>;
    condition: boolean;
    redirectTo: UNAUTHORIZED_ROUTES;
};

type PropsWithOptionalChildren<P = unknown> = P & { children?: ReactNode };
