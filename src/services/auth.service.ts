import { hash, compare } from 'bcryptjs';

const SALTS = 10;

export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return hash(password, SALTS);
    }

    static async comparePassword(
        password: string,
        hash: string,
    ): Promise<boolean> {
        return compare(password, hash);
    }
}
