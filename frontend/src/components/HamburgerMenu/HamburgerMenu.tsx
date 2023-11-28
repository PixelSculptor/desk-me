import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { HamburgerProps } from './HamburgerProps';

import styles from './HamburgerMenu.module.scss';

export function HamburgerMenu({ isMenuActive, toggleMenu }: HamburgerProps) {
    return (
        <div className={styles.hamburger} onClick={toggleMenu}>
            {isMenuActive ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
        </div>
    );
}
