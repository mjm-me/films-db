import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('films:repository:users');
export class UsersRepo {
    prisma;
    constructor() {
        debug('Instanciando');
        this.prisma = new PrismaClient();
    }
    async getByEmail(email) {
        debug('Getting user by email:', email);
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async create(data) {
        debug('Creating new user');
        const user = await this.prisma.user.create({
            data,
            omit: {
                password: true,
            },
        });
        return user;
    }
}
