import { Prisma } from '@prisma/client';
import createDebug from 'debug';
const debug = createDebug('films:dto:users');
debug('Loaded module');

import { z } from 'zod';

//objetos de validación de zod DTO
export const UserCreateDTO = z.object({
    email: z.string().min(3).nonempty(),
    handleName: z.string().min(3).optional(),
    password: z.string().min(6).nonempty(),
    firstName: z.string().min(3).nonempty(),
    lastName: z.string().min(3).nonempty(),
}) satisfies z.Schema<Prisma.UserCreateInput>;

export const UserLoginDTO = z.object({
    email: z.string().min(3).nonempty(),
    password: z.string().min(6).nonempty(),
}) satisfies z.Schema<Pick<Prisma.UserCreateInput, 'email' | 'password'>>;

//extract
export type UserCreateDTO = z.infer<typeof UserCreateDTO>;
export type UserLoginDTO = z.infer<typeof UserLoginDTO>;
