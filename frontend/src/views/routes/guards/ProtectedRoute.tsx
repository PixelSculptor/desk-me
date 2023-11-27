import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/types/Routes';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.Login} state={{ from: location }} replace />;
    }
    return children;
};
