import { useAppSelector } from '@/store/store';
import { selectUser } from '@/store/user/user.selector';

import { isAuth } from '@/utils/isUserEmpty';

export function useAuth() {
    const user = useAppSelector(selectUser);
    const isAuthenticated = isAuth(user);

    return { isAuthenticated };
}
