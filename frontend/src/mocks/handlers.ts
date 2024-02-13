// REST API Mock handlers
import { http, HttpResponse } from 'msw';

import { UserResponse } from '@/types/UserTypes';

const API_URL = import.meta.env.VITE_API_URL as string;

export const handlers = [
    http.post(`${API_URL}/auth/login`, async () => {
        return HttpResponse.json<UserResponse>({
            id: '1',
            email: 'joe-doe@gmail.com',
            name: 'John',
            surname: 'Doe',
            accessToken: '0913ufknjw9j834f',
            refreshToken: '0913ufkd32jw9j834f',
        });
    }),
];
