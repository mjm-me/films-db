import createDebug from 'debug';
const debug = createDebug('films:controllers:films');
export class FilmsController {
    repoFilms;
    constructor(repoFilms) {
        this.repoFilms = repoFilms;
        debug('Instanciando');
    }
    makeResponse(results) {
        const data = {
            results,
            error: '',
        };
        return data;
    }
    getAll = async (req, res, next) => {
        debug('getAll');
        try {
            const films = await this.repoFilms.read();
            res.json(this.makeResponse(films));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        debug('getById');
        try {
            const { id } = req.params;
            const film = await this.repoFilms.readById(id);
            res.json(this.makeResponse([film]));
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        debug('create');
        try {
            const newData = req.body;
            const film = await this.repoFilms.create(newData);
            res.json(this.makeResponse([film]));
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        debug('update');
        try {
            const { id } = req.params;
            const newData = req.body;
            const film = await this.repoFilms.update(id, newData);
            res.json(this.makeResponse([film]));
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        debug('delete');
        try {
            const { id } = req.params;
            const film = await this.repoFilms.delete(id);
            res.json(this.makeResponse([film]));
        }
        catch (error) {
            next(error);
        }
    };
}
