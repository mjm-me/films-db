import { hash, compare } from 'bcryptjs';
const SALTS = 10;
export class AuthService {
    static async hashPassword(password) {
        return hash(password, SALTS);
    }
    static async comparePassword(password, hash) {
        return compare(password, hash);
    }
}
