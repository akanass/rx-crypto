import { Hash } from '../../src';
import { Buffer } from 'buffer';

let hash: Hash;
let password: string;
let salt: string;
let iterations: number;
let keylen: number;
let digest: string;

describe('- Integration hash.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        hash = new Hash();
        password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        salt = 'Kt9V3wgxrhpf8GN3';
        iterations = 4096;
        keylen = 24;
        digest = 'sha256';
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        hash = undefined;
        password = undefined;
        salt = undefined;
        iterations = undefined;
        keylen = undefined;
        digest = undefined;
    });

    /**
     * Test if `Hash.generate()` function returns an Observable with error if parameters are wrong
     */
    test('- `Hash.generate()` function must return an Observable with error if parameters are wrong', (done) => {
        hash.generate(undefined, undefined, undefined, undefined, undefined)
            .subscribe(() => null, err => {
                    expect(err.message).toBe('The "digest" argument must be of type string. Received undefined');
                    done();
                }
            );
    });

    /**
     * Test if `Hash.generate()` Observable returns Buffer
     */
    test('- `Hash.generate()` Observable function must return a Buffer', (done) => {
        hash.generate(password, salt, iterations, keylen, digest).subscribe(buffer => {
            expect(buffer).toBeInstanceOf(Buffer);
            done();
        });
    });

    /**
     * Test if `Hash.generate()` Observable returns Buffer and
     *  his string representation is `61cac683ff27580e4c68778df5208c745b0e473172778658`
     */
    test('- `Hash.generate()` Observable function must return a Buffer and his string representation is ' +
        '`61cac683ff27580e4c68778df5208c745b0e473172778658`', (done) => {
        hash.generate(password, salt, iterations, keylen, digest).subscribe(buffer => {
            expect(buffer.toString('hex')).toBe('61cac683ff27580e4c68778df5208c745b0e473172778658');
            done();
        });
    });
});
