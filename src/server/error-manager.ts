import type { ServerResponse } from 'node:http';
import { HttpError } from '../types/http-error.js';
import createDebug from 'debug';
const debug = createDebug('movies:server:errors');

export const errorManager = (
    error: Error | HttpError,
    response: ServerResponse,
) => {
    if (!('status' in error)) {
        error = {
            ...error,
            statusCode: 500,
            status: 'Internal Server Error',
        };
    }

    const publicMessage = `Error: ${error.statusCode} ${error.status}`;
    debug(publicMessage, error.message);

    const html = `<p>${publicMessage}</p>`;
    response.statusCode = error.statusCode;
    response.statusMessage = error.status;
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(html);
};
