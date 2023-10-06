import { selectUser } from '@/store/user/user.selector';
import { useSelector } from 'react-redux';

export function Home() {
    const user = useSelector(selectUser);
    // return <>{user ? <Navigation /> : <Navigate replace to="/register" />}</>;
    return (
        <>
            <h1>Witaj {user.name}</h1>
        </>
    );
}
