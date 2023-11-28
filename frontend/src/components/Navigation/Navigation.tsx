import { useState } from 'react';

import { NavigationLink } from './NavigationLink/NavigationLink';
import { HamburgerMenu } from '@components/HamburgerMenu/HamburgerMenu';
import { NAV_LINKS } from './NavigationData';

import styles from './Navigation.module.scss';

export function Navigation() {
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => setMenu(!menu);
    return (
        <nav className={styles['navigation']}>
            <HamburgerMenu toggleMenu={toggleMenu} isMenuActive={menu} />
            <ul className={`${styles['navigation__list']} ${menu && styles['navigation__list--active']}`}>
                {NAV_LINKS.map(({ Icon, path, text }) => (
                    <NavigationLink Icon={Icon} path={path} navLinkText={text} key={path} />
                ))}
            </ul>
        </nav>
    );
}
