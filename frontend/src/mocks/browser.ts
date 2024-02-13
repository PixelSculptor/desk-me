import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// This configures a request mocking interceptor with the given request handlers.
export const browserWorker = setupWorker(...handlers);
