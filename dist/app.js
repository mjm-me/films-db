import express from 'express';
import createDebug from 'debug';
import { resolve } from 'path';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { debugLogger } from './middleware/debug-logger.js';
import { notFoundController, notMethodController, } from './controllers/base.controller.js';
import { errorManager } from './controllers/errors.controller.js';
import { createFilmsRouter } from './router/films.router.js';
import { createUsersRouter } from './router/users.router.js';
import { UsersRepo } from './repo/users.repository.js';
import { FilmRepo } from './repo/films.repository.js';
import { FilmsController } from './controllers/films.controller.js';
import { UsersController } from './controllers/users.controller.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { ReviewsController } from './controllers/reviews.controller.js';
import { ReviewRepo } from './repo/reviews.repository.js';
import { createReviewsRouter } from './router/reviews.router.js';
const debug = createDebug('movies:app');
debug('Loaded module');
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
    // Controllers, Repositories... instances
    const authInterceptor = new AuthInterceptor();
    // Films
    const filmsRepo = new FilmRepo();
    const filmsController = new FilmsController(filmsRepo);
    const filmsRouter = createFilmsRouter(authInterceptor, filmsController);
    // Users
    const usersRepo = new UsersRepo();
    const usersController = new UsersController(usersRepo);
    const usersRouter = createUsersRouter(usersController);
    // Reviews
    const reviewsRepo = new ReviewRepo();
    const reviewsController = new ReviewsController(reviewsRepo);
    const reviewsRouter = createReviewsRouter(authInterceptor, reviewsController);
    // Routes registry
    app.use('/api/films', filmsRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/reviews', reviewsRouter);
    app.get('*', notFoundController); // 404
    app.use('*', notMethodController); // 405
    app.use(errorManager);
    return app;
};
