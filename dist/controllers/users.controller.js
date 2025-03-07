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
}
