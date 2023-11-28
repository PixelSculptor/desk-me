export enum ROUTES {
    Home = '/',
    Register = '/register',
    Login = '/login',
    Bookings = '/bookings',
}

export const VIEWS = ['/', '/login', '/register', '/bookings'] as const;

export type AVAILABLE_ROUTES = (typeof VIEWS)[number];

export type UNAUTHORIZED_ROUTES = '/login' | '/register';
