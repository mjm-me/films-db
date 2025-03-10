import { Router } from 'express';
import createDebug from 'debug';
import { Role } from '@prisma/client';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { CategoriesController } from '../controllers/categories.controller.js';

const debug = createDebug('movies:router:categories');

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
