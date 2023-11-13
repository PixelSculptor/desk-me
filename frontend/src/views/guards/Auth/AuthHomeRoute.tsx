import { Home } from '@/views/Home/Home';

import { AuthRoute } from '@/views/guards/ConditionRoute/ConditionRoute';

export const AuthHome = AuthRoute<unknown>(Home);
