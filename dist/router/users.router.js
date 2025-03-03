import { Router } from 'express';
import createDebug from 'debug';
const debug = createDebug('films:router:users');
export const createUsersRouter = (usersController) => {
    debug('Ejecutando createFilmsRouter');
    const usersRouter = Router();
    //usersRouter.get('/', usersController.getAll);
    //usersRouter.get('/:id', usersController.getById);
    usersRouter.post('/register', usersController.create);
    usersRouter.post('/login', usersController.login);
    //usersRouter.patch('/:id', usersController.update);
    //usersRouter.delete('/:id', usersController.delete);
    return usersRouter;
};
