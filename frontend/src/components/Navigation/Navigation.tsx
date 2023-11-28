import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useToggle } from '@/hooks/useToggle';

import { NavigationLink } from './NavigationLink/NavigationLink';
import { NAV_LINKS } from './NavigationData';
import { HamburgerMenu } from '@components/HamburgerMenu/HamburgerMenu';

import { ROUTES } from '@/types/Routes';

import styles from './Navigation.module.scss';

function NavigationSidebar() {
    const { value: menu, toggleFlag } = useToggle(false);
    return (
        <nav className={styles['navigation']}>
            <HamburgerMenu toggleMenu={toggleFlag} isMenuActive={menu} />
            <ul className={`${styles['navigation__list']} ${menu && styles['navigation__list--active']}`}>
                {NAV_LINKS.map(({ Icon, path, text }) => (
                    <NavigationLink Icon={Icon} path={path} navLinkText={text} key={path} />
                ))}
            </ul>
        </nav>
    );
}

export function Navigation() {
    const { value: showNav, toggleFlag: toggleNav } = useToggle(false);
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    useLayoutEffect(() => {
        if ((location.pathname === ROUTES.Login || location.pathname === ROUTES.Register) && isAuthenticated) {
            toggleNav(false);
        } else {
            toggleNav(true);
        }
    }, [showNav, location, isAuthenticated]);
    return <>{showNav && <NavigationSidebar />}</>;
}
