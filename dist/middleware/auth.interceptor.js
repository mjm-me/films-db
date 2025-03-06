import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../types/http-error.js';
import createDebug from 'debug';
import { Role } from '@prisma/client';
const debug = createDebug('films:interceptors:auth');
export class AuthInterceptor {
    constructor() {
        debug('Instanciando');
    }
    authenticate = async (req, res, next) => {
        debug('authenticate');
        //req.cookies
        const { authorization } = req.headers;
        if (!authorization || authorization.includes('Bearer') === false) {
            const newError = new HttpError('Token not found', 401, 'Unauthorized');
            next(newError);
            return;
        }
        const token = authorization.split(' ')[1];
        try {
            const Payload = await AuthService.verifyToken(token);
            // req.session.save = payload;
            req.user = 'payload';
            res.locals.user = Payload;
            next();
        }
        catch (err) {
            const newError = new HttpError(err.message, 401, 'Unauthorized');
            next(newError);
        }
    };
    isAdmin = async (req, _res, next) => {
        debug('isAdmin');
        if (!req.user || req.user.role !== Role.ADMIN) {
            const newError = new HttpError('You do not have permission', 403, 'Forbidden');
            next(newError);
            return;
        }
    };
    isEditor = async (req, _res, next) => {
        debug('isEditor');
        if (!req.user || req.user.role === Role.USER) {
            const newError = new HttpError('You do not have permission', 403, 'Forbidden');
            next(newError);
            return;
        }
    };
    isOwner = async (req, _res, next) => {
        debug('isOwner');
        if (!req.user || req.user.role === Role.USER) {
            const newError = new HttpError('You do not have permission', 403, 'Forbidden');
            next(newError);
            return;
        }
    };
}
