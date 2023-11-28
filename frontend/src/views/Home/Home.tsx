import { useSelector } from 'react-redux';

import { selectUser } from '@/store/user/user.selector';

import classes from './Home.module.scss';

export function Home() {
    const user = useSelector(selectUser);
    return (
        <>
            <main className={classes.homeview}>
                <h2 className={classes.homeview__greetings}>{`Witaj ${user.name}`}</h2>
            </main>
        </>
    );
}
