import { Navigate, useLocation } from 'react-router-dom';
import { isAuth } from '@/hooks/isAuth';
import { useAppSelector } from '@/store/store';
import { selectUser } from '@/store/user/user.selector';
import { ROUTES } from '@/types/Routes';

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = isAuth(useAppSelector(selectUser));
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.Login} state={{ from: location }} replace />;
    }
    return children;
};
