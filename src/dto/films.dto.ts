import { Prisma } from '@prisma/client';
import createDebug from 'debug';
const debug = createDebug('films:dto:films');
debug('Loaded module');

import { z } from 'zod';

//objetos de validación de zod DTO
export const FilmCreateDTO = z.object({
    title: z.string().min(3).nonempty(),
    description: z.string(),
    releaseYear: z.number().int().positive().min(1900).max(2100),
    rating: z.number().min(1).max(10),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url(),
    categories: z.array(string()).optional(),
}) satisfies z.Schema<Prisma.FilmCreateInput>;

export type FilmCreateDTO = z.infer<typeof FilmCreateDTO>;
