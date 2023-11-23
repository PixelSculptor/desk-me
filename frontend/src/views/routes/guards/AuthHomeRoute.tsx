import { Navigate, useLocation } from 'react-router-dom';
import { isAuth } from '@/hooks/isAuth';
import { useAppSelector } from '@/store/store';
import { selectUser } from '@/store/user/user.selector';
import { ROUTES } from '@/types/Routes';
import { Home } from '@/views/Home/Home';

import { AuthRoute } from '@/views/routes/ConditionRoute/ConditionRoute';

// TODO: clean up this rubbish and refactor to more generic

export const AuthHome = AuthRoute<unknown>(Home);

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = isAuth(useAppSelector(selectUser));
    const location = useLocation();
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.Login} state={{ from: location }} replace />;
    }
    return children;
};
