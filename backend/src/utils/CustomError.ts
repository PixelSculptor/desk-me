type HttpClientStatusErrorCodes = 400 | 401 | 403 | 404 | 405 | 408 | 409;

type HttpClientErrorMessages = {
    400: 'Bad Request';
    401: 'Unauthorized';
    403: 'Forbidden';
    404: 'Not Found';
    405: 'Method Not Allowed';
    408: 'Request Timeout';
    409: 'Conflict';
};

export type CustomError<T extends HttpClientStatusErrorCodes> = {
    code: T;
    message: HttpClientErrorMessages[T];
};
