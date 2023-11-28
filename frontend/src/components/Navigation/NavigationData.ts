import { IconType } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from 'react-icons/md';
import { AVAILABLE_ROUTES, ROUTES } from '@/types/Routes';

type NavlinkType = {
    path: AVAILABLE_ROUTES;
    text: string;
    Icon: IconType;
};

export const NAV_LINKS: Readonly<NavlinkType[]> = [
    {
        path: ROUTES.Home,
        text: 'Panel domowy',
        Icon: FaIcons.FaHome,
    },
    {
        path: ROUTES.Bookings,
        text: 'Moje rezerwacje',
        Icon: GiIcons.GiDesk,
    },
    {
        path: ROUTES.Login,
        text: 'Wyloguj się',
        Icon: MdIcons.MdLogout,
    },
] as const;
