import { Router } from 'express';
import createDebug from 'debug';
const debug = createDebug('films:router:films');
export const createFilmsRouter = (authInterceptor, filmsController) => {
    debug('Ejecutando createFilmsRouter');
    const filmsRouter = Router();
    filmsRouter.get('/', authInterceptor.authenticate, filmsController.getAll);
    filmsRouter.get('/:id', authInterceptor.authenticate, filmsController.getById);
    filmsRouter.post('/', authInterceptor.authenticate, filmsController.create);
    filmsRouter.patch('/:id', authInterceptor.authenticate, filmsController.update);
    filmsRouter.delete('/:id', authInterceptor.authenticate, filmsController.delete);
    return filmsRouter;
};
