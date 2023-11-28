import { NavLink } from 'react-router-dom';

import { AVAILABLE_ROUTES } from '@/types/Routes';

import classes from './NavigationLink.module.scss';

export type NavigationLinkProps = {
    path: AVAILABLE_ROUTES;
    navLinkText: string;
};

export function NavigationLink({ path, navLinkText }: NavigationLinkProps) {
    return (
        <li className={classes['navlink']}>
            <NavLink to={path} className={({ isActive }) => (isActive ? classes.active : '')}>
                {navLinkText}
            </NavLink>
        </li>
    );
}
