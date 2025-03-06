// import { Prisma, User, Film } from '@prisma/client';
// import createDebug from 'debug';
// const debug = createDebug('films:dto:film');
// debug('Loaded module');

// import { z } from 'zod';

// export const ReviewCreateDTO = z.object({
//     content: z.string().min(3).nonempty(),
//     rating: z.number().min(1).max(10),
//     film: z.ZodObject<Film>//string(),
//     user: z.string(),
//     // releaseYear: z.number().int().positive().min(1900).max(2100),
//     // rating: z.number().min(1).max(10),
//     // director: z.string().nonempty(),
//     // duration: z.number().int().positive(),
//     // poster: z.string().url(),
//     // categories: z.array(z.string()).optional(),
// }) satisfies z.Schema<Prisma.ReviewCreateInput>;

// // extract the inferred type
// export type ReviewCreateDTO = z.infer<typeof ReviewCreateDTO>;
