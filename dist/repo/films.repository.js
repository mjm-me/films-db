import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('films:repository:films');
export class FilmRepo {
    prisma;
    constructor() {
        debug('Instanciando');
        this.prisma = new PrismaClient();
    }
    async read() {
        debug('Reading films');
        const films = await this.prisma.film.findMany();
        return films;
        // return await this.prisma.film.findMany();
    }
    async readById(id) {
        debug('Reading film with id');
        const film = await this.prisma.film.findUniqueOrThrow({
            where: { id },
        });
        return film;
    }
    async create(data) {
        debug('Creating new film');
        const film = await this.prisma.film.create({
            data,
        });
        return film;
    }
    async update(id, data) {
        debug('Updating film with id:', id);
        const film = await this.prisma.film.update({
            where: { id },
            data,
        });
        return film;
    }
    async delete(id) {
        debug('Deleting film with id:', id);
        const film = await this.prisma.film.delete({
            where: {
                id,
            },
        });
        return film;
    }
}
