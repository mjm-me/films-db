import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller.js';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { Role } from '@prisma/client';

const debug = createDebug('movies:router:films');

export const createCategoriesRouter = (
    authInterceptor: AuthInterceptor,
    categoriesController: CategoriesController,
) => {
    debug('Ejecutando createCategoriesRouter');

    const categoriesRouter = Router();
    categoriesRouter.get('/', categoriesController.getAll);
    categoriesRouter.post(
        '/',
        authInterceptor.authenticate,
        authInterceptor.hasRole(Role.EDITOR),
        categoriesController.create,
    );
    return categoriesRouter;
};
