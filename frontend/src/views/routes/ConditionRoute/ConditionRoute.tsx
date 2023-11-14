import { Navigate } from 'react-router-dom';

import { UNAUTHORIZED_ROUTES } from '@/types/Routes';
import { isAuth } from '@/hooks/isAuth';
import { PropsWithOptionalChildren } from './ComponentRouteProps';

function ConditionRoute<InnerProps>(
    Component: React.FC<PropsWithOptionalChildren<InnerProps>>,
    condition: boolean,
    redirectTo: UNAUTHORIZED_ROUTES
) {
    return (props: InnerProps & { children?: React.ReactNode }) => {
        return condition ? <Component {...props} /> : <Navigate to={redirectTo} />;
    };
}

export function AuthRoute<C>(Component: React.FunctionComponent) {
    const persistedStore = sessionStorage.getItem('persist:root');
    const user = persistedStore ? isAuth(JSON.parse(JSON.parse(persistedStore).user).user) : false;

    return ConditionRoute<C>(Component, user, '/login');
}
