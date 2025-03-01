import createDebug from 'debug';
// import { ErrorPage } from '../views/pages/error-page.js';
const debug = createDebug('films:errorManager');
export const errorManager = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    if (!('status' in err)) {
        err = {
            ...err,
            statusCode: 500,
            status: 'Internal Server Error',
        };
    }
    const publicMessage = `Error: ${err.statusCode} ${err.status}`;
    // const view = new ErrorPage();
    debug(publicMessage, err.message);
    res.status(err.statusCode);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const response = {
        results: null,
        error: publicMessage,
    };
    res.json(response);
};
