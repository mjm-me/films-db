import createDebug from 'debug';
import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../types/http-error.js';
import { UserCreateDTO, UserLoginDTO } from '../dto/users.dto.js';
const debug = createDebug('movies:controller:users');
export class UsersController {
    repoUsers;
    constructor(repoUsers) {
        this.repoUsers = repoUsers;
        debug('Instanciando');
    }
    makeResponse(results) {
        const data = {
            results,
            error: '',
        };
        return data;
    }
    // Los métodos no son arrow functions
    // para tener en el router un ejemplo del uso de bind
    async getAll(_req, res, next) {
        debug('getAll');
        try {
            const users = await this.repoUsers.read();
            res.json(this.makeResponse(users));
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        debug('getById');
        try {
            const { id } = req.params;
            const user = await this.repoUsers.readById(id);
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        debug('create');
        try {
            const newData = req.body;
            UserCreateDTO.parse(newData);
            newData.password = await AuthService.hashPassword(newData.password);
            const user = await this.repoUsers.create(newData);
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        const error = new HttpError('User or password not valid', 401, 'Unauthorized');
        try {
            const { email, password: clientPassword } = req.body;
            // if (!email || !clientPassword) {
            //     throw error;
            // }
            try {
                UserLoginDTO.parse({ email, password: clientPassword });
            }
            catch (err) {
                error.message = err.message; //.errors[0].message;
                throw error;
            }
            const user = await this.repoUsers.getByEmail(email);
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
            const token = await AuthService.generateToken({
                id: userWithoutPasswd.id,
                email: userWithoutPasswd.email,
                role: userWithoutPasswd.role,
            });
            const results = {
                token,
            };
            res.cookie('token', token);
            res.json([
                {
                    results,
                    error: '',
                },
            ]);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        debug('update');
        try {
            const { id } = req.params;
            const newData = req.body;
            delete newData.password;
            delete newData.role;
            const user = await this.repoUsers.update(id, newData);
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    }
    async setRole(req, res, next) {
        debug('setRole');
        try {
            const { id } = req.params;
            const newData = req.body;
            if (!newData.role) {
                throw new HttpError('Role is required', 400, 'Bad Request');
            }
            const user = await this.repoUsers.update(id, {
                role: newData.role,
            });
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    }
    async setPassword(req, res, next) {
        debug('setPassword');
        try {
            const { id } = req.params;
            const newData = req.body;
            if (!newData.password) {
                throw new HttpError('Password is required', 400, 'Bad Request');
            }
            const user = await this.repoUsers.update(id, newData.password);
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        debug('delete');
        try {
            const { id } = req.params;
            const user = await this.repoUsers.delete(id);
            res.json(this.makeResponse([user]));
        }
        catch (error) {
            next(error);
        }
    }
}
