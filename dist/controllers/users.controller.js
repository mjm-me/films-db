import createDebug from 'debug';
import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../types/http-error.js';
const debug = createDebug('films:controllers:users');
export class UsersController {
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
    create = async (req, res, next) => {
        debug('create');
        try {
            const newData = req.body;
            newData.password = await AuthService.hashPassword(newData.password);
            const user = await this.repoFilms.create(newData);
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    };
    async login(req, res, next) {
        const error = new HttpError('User or password not valid', 401, 'Unauthorized');
        try {
            const { email, password: clientPassword } = req.body;
            const user = await this.repoFilms.getByEmail(email);
            if (user === null) {
                throw error;
            }
            // password; // cliente -> sin encriptar
            // user.password; // base de datos -> encriptado
            const { password: hashedPassword, ...userWithoutPasswd } = user;
            const isValid = await AuthService.comparePassword(clientPassword, hashedPassword);
            if (!isValid) {
                throw error;
            }
            res.json(this.makeResponse([userWithoutPasswd]));
        }
        catch (error) {
            next(error);
        }
    }
}
