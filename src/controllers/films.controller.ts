import { NextFunction, Request, Response } from 'express';
import { Film } from '@prisma/client';
import { Repository } from '../repo/repository.type.js';
import { AppResponse } from '../types/app-response';
import createDebug from 'debug';
const debug = createDebug('films:controllers:films');

export class FilmsController {
    constructor(private repoFilms: Repository<Film>) {
        debug('Instanciando');
    }

    private makeResponse(results: Film[]) {
        const data: AppResponse<Film> = {
            results,
            error: '',
        };
        return data;
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        debug('getAll');
        try {
            const films = await this.repoFilms.read();
            res.json(this.makeResponse(films));
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        debug('getById');
        try {
            const { id } = req.params;
            const film = await this.repoFilms.readById(id);
            res.json(this.makeResponse([film]));
        } catch (error) {
            next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        debug('create');
        try {
            const newData = req.body;
            const film = await this.repoFilms.create(newData);
            res.json(this.makeResponse([film]));
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        debug('update');
        try {
            const { id } = req.params;
            const newData = req.body;
            const film = await this.repoFilms.update(id, newData);
            res.json(this.makeResponse([film]));
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        debug('delete');
        try {
            const { id } = req.params;
            const film = await this.repoFilms.delete(id);
            res.json(this.makeResponse([film]));
        } catch (error) {
            next(error);
        }
    };
}
