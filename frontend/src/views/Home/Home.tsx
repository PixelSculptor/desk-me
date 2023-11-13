import { selectUser } from '@/store/user/user.selector';
import { useSelector } from 'react-redux';

export function Home() {
    const user = useSelector(selectUser);
    return (
        <>
            <h1>Witaj {user.name}</h1>
        </>
    );
}
