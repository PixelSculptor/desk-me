import { Navigate } from 'react-router-dom';
import { ComponentRouteProps } from './ComponentRouteProps';

export function ConditionRoute<InnerProps>({ Component, condition, redirectTo }: ComponentRouteProps<InnerProps>) {
    return (props: InnerProps & { children?: React.ReactNode }) => {
        return condition ? <Component {...props} /> : <Navigate to={redirectTo} />;
    };
}
