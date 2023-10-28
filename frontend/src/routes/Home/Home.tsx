import { Navigate } from 'react-router-dom';
import { selectUser } from '@/store/user/user.selector';
import { useSelector } from 'react-redux';
import { isAuth } from '@hooks/isAuth';

export function Home() {
    const user = useSelector(selectUser);
    if (!isAuth(user)) return <Navigate to={'/login'} />;
    return (
        <>
            <h1>Witaj {user.name}</h1>
        </>
    );
}
