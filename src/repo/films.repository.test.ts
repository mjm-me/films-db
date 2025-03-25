import { PrismaClient } from '@prisma/client';
import { FilmRepo } from './films.repository';
import { vi } from 'vitest';

describe('Given class FilmRepo', () => {
    let filmRepo: FilmRepo;
    beforeAll(() => {
        // Arrange
        filmRepo = new FilmRepo();
        filmRepo.prisma = {
            film: {
                findMany: vi.fn().mockReturnValue([]), //función mockeada
            } as unknown as PrismaClient;
        }

    describe('When we instantiate it', () => {
        test('Then it should be a instance of FilmRepo', () => {
            // Act & Assert
            expect(filmRepo).toBeInstanceOf(FilmRepo);
        });
    });
    describe('When read is called', () => {
        test('Then it should return an array of Films', async () => {
            // Act & Assert
            const result = await filmRepo.read();
            expect(result).toBeInstanceOf([]);
        });
    });


});
