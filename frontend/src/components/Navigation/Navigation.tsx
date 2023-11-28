import { NavigationLink } from './NavigationLink/NavigationLink';
import { NAV_LINKS } from './NavigationData';
import { HamburgerMenu } from '@components/HamburgerMenu/HamburgerMenu';
import { useToggle } from '@/hooks/useToggle';

import styles from './Navigation.module.scss';

export function Navigation() {
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
