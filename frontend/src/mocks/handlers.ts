// REST API Mock handlers
import { http, HttpResponse } from 'msw';

import { UserResponse } from '@/types/UserTypes';

import { MOCK_USER } from './mockData';

const API_URL = import.meta.env.VITE_API_URL as string;

export const handlers = [
    http.post(`${API_URL}/auth/login`, async () => {
        return HttpResponse.json<UserResponse>(MOCK_USER);
    }),
];
