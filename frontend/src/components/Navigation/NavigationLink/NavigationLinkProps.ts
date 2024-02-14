import { IconType } from 'react-icons';

import { AVAILABLE_ROUTES } from '@/types/Routes';

export type NavigationLinkProps = {
    path: AVAILABLE_ROUTES;
    navLinkText: string;
    Icon: IconType;
    toggleMenu: () => void;
};
