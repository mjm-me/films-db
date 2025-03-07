import createDebug from 'debug';
const debug = createDebug('movies:dto:film');
debug('Loaded module');
import { z } from 'zod';
export const ReviewCreateDTO = z.object({
    content: z.string().min(3).nonempty(),
    userRating: z.number().min(0).max(10).optional(),
    userId: z.string(),
    filmId: z.string(),
});
export const ReviewUpdateDTO = z.object({
    content: z.string().min(3).nonempty().optional(),
    userRating: z.number().min(0).max(10).optional(),
});
