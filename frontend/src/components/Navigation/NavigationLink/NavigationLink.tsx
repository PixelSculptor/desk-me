import { NavLink } from 'react-router-dom';

import { NavigationLinkProps } from './NavigationLinkProps';

import classes from './NavigationLink.module.scss';

export function NavigationLink({ path, navLinkText, Icon }: NavigationLinkProps) {
    return (
        <li className={classes['navlink']}>
            <NavLink to={path} className={({ isActive }) => (isActive ? classes.active : '')}>
                <Icon />
                {navLinkText}
            </NavLink>
        </li>
    );
}
