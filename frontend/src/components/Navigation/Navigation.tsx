import { useAuth } from '@/hooks/useAuth';

import { NavigationLink } from './NavigationLink/NavigationLink';
import { ROUTES } from '@/types/Routes';

export function Navigation() {
    const isAuthenticated = useAuth();
    return (
        <nav className="navigation">
            <ul>
                <NavigationLink navLinkText="Dashboard" path={ROUTES.Home} />
                <NavigationLink navLinkText="Moje rezerwacje" path={ROUTES.Bookings} />
                <NavigationLink navLinkText={isAuthenticated ? 'Wyloguj się' : 'Zaloguj się'} path={ROUTES.Login} />
            </ul>
        </nav>
    );
}
