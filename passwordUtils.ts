import { hash } from 'node-password-util';
import bcrypt from 'bcrypt';

const saltRounds = 10;

module.exports = {
    encryptPassword: async function (plainPassword) {
        try {
            const hashed = await bcrypt.hash(plainPassword, saltRounds);
            return hashed;
        } catch (err) {
            console.error('Error encriptando la contraseña:', err);
            throw err;
        }
    },

    comparePassword: async function (plainPassword, hashedPassword) {
        try {
            const result = await bcrypt.compare(plainPassword, hashedPassword);
            return result;
        } catch (err) {
            console.error('Error comparando la contraseña:', err);
            throw err;
        }
    }
};
