import { Navigate } from 'react-router-dom';
import { Navigation } from '@components/Navigation/Navigation';
import { getUser } from '@hooks/getUser';

export function Home() {
    const user = getUser();
    return <>{user ? <Navigation /> : <Navigate replace to="/register" />}</>;
}
