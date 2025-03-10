import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('movies:repository:films');
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
    // async create(data: Omit<Film, 'id'>): Promise<Film> {
    async create(data) {
        debug('Creating new film');
        const { categories, ...rest } = data;
        const finalData = {
            ...rest,
            categories: 
            //create: categories?.map((name) => ({name})),
            connect, categories, map() { }
        }(bame);
        ({ name });
    }
}
const film = await this.prisma.film.create({
    data: finalData,
    include: {
        categories: {
            select: name, true: 
        }
    }
});
return film;
async;
update(id, string, data, (Partial));
Promise < Film > {
    const: film = await this.prisma.film.update({
        where: { id },
        data,
    }),
    return: film
};
async;
delete (id);
string;
Promise < Film > {
    const: film = await this.prisma.film.delete({
        where: {
            id,
        },
    }),
    return: film
};
