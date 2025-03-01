import createDebug from 'debug';
export const debugLogger = (name = 'logger') => {
    return (req, _res, next) => {
        const debug = createDebug(`films:${name}`);
        debug(req.method, req.url);
        next();
    };
};
