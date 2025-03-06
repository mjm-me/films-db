import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('films:repository:reviews');
export class ReviewRepo {
    prisma;
    constructor() {
        debug('Instanciando');
        this.prisma = new PrismaClient();
    }
    async read() {
        debug('Reading reviews');
        const reviews = await this.prisma.review.findMany();
        return reviews;
        // return await this.prisma.review.findMany();
    }
    async readById(id) {
        debug('Reading review with id');
        const review = await this.prisma.review.findUniqueOrThrow({
            where: { id },
        });
        return review;
    }
    async create(data) {
        debug('Creating new review');
        const review = await this.prisma.review.create({
            data,
        });
        return review;
    }
    async update(id, data) {
        debug('Updating review with id:', id);
        const review = await this.prisma.review.update({
            where: { id },
            data,
        });
        return review;
    }
    async delete(id) {
        debug('Deleting review with id:', id);
        const review = await this.prisma.review.delete({
            where: {
                id,
            },
        });
        return review;
    }
}
