import express from 'express';
import createDebug from 'debug';
import { resolve } from 'path';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Film, Review } from '@prisma/client';
import { debugLogger } from './middleware/debug-logger.js';
import {
    notFoundController,
    notMethodController,
} from './controllers/base.controller.js';
import { errorManager } from './controllers/errors.controller.js';
import { createFilmsRouter } from './router/films.router.js';
import { createUsersRouter } from './router/users.router.js';
import type { Repository } from './repo/repository.type.js';
import { UsersRepo } from './repo/users.repository.js';
import { FilmRepo } from './repo/films.repository.js';
import { FilmsController } from './controllers/films.controller.js';
import { UsersController } from './controllers/users.controller.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { Payload } from './services/auth.service.js';
import { ReviewsController } from './controllers/reviews.controller.js';
import { ReviewRepo } from './repo/reviews.repositoty.js';
import { createReviewsRouter } from './router/reviews.router.js';

const debug = createDebug('films:app');
debug('Loaded module');

declare module 'express' {
    interface Request {
        user?: Payload;
    }
}

export const createApp = () => {
    debug('Iniciando App...');

    const app = express();
    const __dirname = resolve();
    const publicPath = resolve(__dirname, 'public');

    app.disable('x-powered-by');

    debug('Registrando Middleware...');

    // Middlewares
    app.use(cors());
    if (!process.env.DEBUG) {
        app.use(morgan('dev'));
    }
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(debugLogger('debug-logger'));
    app.use(express.static(publicPath));

    const authInterceptor = new AuthInterceptor();
    const repoFilms: Repository<Film> = new FilmRepo();
    const filmsController = new FilmsController(repoFilms);

    const repoReviews: Repository<Review> = new ReviewRepo();
    const reviewsController = new ReviewsController(repoReviews);

    const filmsRouter = createFilmsRouter(authInterceptor, filmsController);
    const repoUsers = new UsersRepo();
    const usersController = new UsersController(repoUsers);
    const usersRouter = createUsersRouter(usersController);
    const reviewsRouter = createReviewsRouter(
        authInterceptor,
        reviewsController,
    );

    // Routes registry
    app.use('/api/films', filmsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/reviews', reviewsRouter);

    app.get('*', notFoundController); // 404
    app.use('*', notMethodController); // 405

    app.use(errorManager);

    return app;
};
