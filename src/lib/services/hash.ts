import { pbkdf2 } from 'crypto';
import { bindNodeCallback, Observable } from 'rxjs';

export class Hash {
    /**
     * Provides an asynchronous Password-Based Key Derivation Function 2 (PBKDF2) implementation.
     * A selected HMAC digest algorithm specified by digest is applied to derive a key of the requested byte length (keylen)
     * from the password, salt and iterations.
     *
     * @param {string | Buffer} data will be hashed. Generally a password in key creation.
     * @param {string | Buffer} salt should also be as unique as possible.
     *  It is recommended that the salts are random and their lengths are greater than 16 bytes
     * @param {number} iterations argument must be a number set as high as possible.
     *  The higher the number of iterations, the more secure the derived key will be, but will take a longer amount of time to complete.
     * @param {number} keylen requested byte length
     * @param {string} digest HMAC digest algorithm is applied to derive a key of the requested byte length (keylen)
     *
     * @return {Observable<Buffer>} The successfully generated derivedKey will be passed as a Buffer.
     */
    generate(data: string | Buffer, salt: string | Buffer, iterations: number, keylen: number, digest: string): Observable<Buffer> {
        return (<(data: string | Buffer, salt: string | Buffer, iterations: number, keylen: number, digest: string) =>
            Observable<Buffer>>bindNodeCallback(pbkdf2))(data, salt, iterations, keylen, digest);
    }
}
