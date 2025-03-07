import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../types/http-error.js';
import createDebug from 'debug';
import { Role } from '@prisma/client';
//  { Role } from '@prisma/client';
const debug = createDebug('movies:interceptor:auth');
export class AuthInterceptor {
    constructor() {
        debug('Instanciando');
    }
    authenticate = async (req, _res, next) => {
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
            const payload = await AuthService.verifyToken(token);
            // Añado datos a req disponibles para siguientes etapas
            // Previamente he extendido la interfaz Request en express
            req.user = payload;
            // Opcionalmente, añado datos a res.locals
            // para que estén disponibles en las vistas
            // res.locals.user = payload;
            next();
        }
        catch (err) {
            const newError = new HttpError(err.message, 401, 'Unauthorized');
            next(newError);
        }
    };
    hasRole = (role) => {
        return (req, _res, next) => {
            debug('hasRole');
            if (!req.user ||
                (req.user.role !== role && req.user.role !== Role.ADMIN)) {
                const newError = new HttpError('You do not have permission', 403, 'Forbidden');
                next(newError);
                return;
            }
            next();
        };
    };
    isOwnerReview = async (req, _res, next) => {
        debug('isOwner');
        if (!req.user) {
            const newError = new HttpError('You do not have permission', 403, 'Forbidden');
            next(newError);
            return;
        }
        // Item -> req.params.id
        const { id: reviewId } = req.params;
        // User -> req.user.id
        const { id: userId } = req.user;
        // console.log(itemId, userId);
    };
}
