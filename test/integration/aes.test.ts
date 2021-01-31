import { Buffer } from 'buffer';
import { of } from 'rxjs';
import { AES, AESKeyCreationResult } from '../../src';
import { decryptWithAesKey, encryptWithAesKey } from '../../src/operators/aes';

let aes: AES;
let password: string;
let salt: string;

describe('- Integration aes.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        aes = new AES();
        password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
        salt = 'Kt9V3wgxrhpf8GN3';
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        aes = undefined;
        password = undefined;
        salt = undefined;
    });

    /**
     * Test if `AES.createKey()` function returns an Observable with error if AES key parameters are wrong
     */
    test('- `AES.createKey()` function must return an Observable with error if AES key parameters are wrong', (done) => {
        aes.createKey(null, null).subscribe(() => null, err => {
            expect(err.message).toBe('The "password" argument must be of type string or an instance of ArrayBuffer, Buffer, TypedArray, or DataView. Received null');
            done();
        });
    });

    /**
     * Test if `AES.createKey()` Observable returns AESKeyCreationResult object
     */
    test('- `AES.createKey()` Observable function must return an AESKeyCreationResult object `{key, iv}`', (done) => {
        aes.createKey(password, salt).subscribe((aesKeyCreationResult: AESKeyCreationResult) => {
            expect(aesKeyCreationResult).toHaveProperty('key');
            expect(aesKeyCreationResult).toHaveProperty('iv');
            expect(aesKeyCreationResult).toStrictEqual({
                key: '61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f4419',
                iv: '31cef43b785870e993cbc94aee0354cf'
            });
            done();
        });
    });

    /**
     * Test if `AES.createKey().pipe(encryptWithAesKey())` returns Buffer
     */
    test('- `AES.createKey().pipe(encryptWithAesKey())` must return a Buffer', (done) => {
        aes.createKey(password, salt)
            .pipe(
                encryptWithAesKey(Buffer.from('data'))
            )
            .subscribe(buffer => {
                expect(buffer).toBeInstanceOf(Buffer);
                done();
            });
    });

    /**
     * Test if `AES.createKey().pipe(encryptWithAesKey())` returns Buffer and
     *  his string representation is `a3d4bb8fcb8ec0e24a86cef07a28e3af`
     */
    test('- `AES.createKey().pipe(encryptWithAesKey())` must return a Buffer and his string representation is ' +
        '`a3d4bb8fcb8ec0e24a86cef07a28e3af`', (done) => {
        aes.createKey(password, salt)
            .pipe(
                encryptWithAesKey(Buffer.from('data'))
            )
            .subscribe(buffer => {
                expect(buffer.toString('hex')).toBe('a3d4bb8fcb8ec0e24a86cef07a28e3af');
                done();
            });
    });

    /**
     * Test if `AES.createKey().pipe(decryptWithAesKey())` returns Buffer
     */
    test('- `AES.createKey().pipe(decryptWithAesKey())` must return a Buffer', (done) => {
        aes.createKey(password, salt)
            .pipe(
                decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            )
            .subscribe(buffer => {
                expect(buffer).toBeInstanceOf(Buffer);
                done();
            });
    });

    /**
     * Test if `AES.createKey().pipe(decryptWithAesKey())` returns Buffer and
     *  his string representation is `data`
     */
    test('- `AES.createKey().pipe(decryptWithAesKey())` must return a Buffer and his string representation is ' +
        '`data`', (done) => {
        aes.createKey(password, salt)
            .pipe(
                decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            )
            .subscribe(buffer => {
                expect(buffer.toString()).toBe('data');
                done();
            });
    });

    /**
     * Test if `AES.createKey().pipe(encryptWithAesKey())` lettable operator returns an Observable with error if AES key is wrong
     */
    test('- `AES.createKey().pipe(encryptWithAesKey())` must return an Observable with error if AES key is wrong', (done) => {
        of({ key: null, iv: null })
            .pipe(
                encryptWithAesKey(Buffer.from('data'))
            )
            .subscribe(() => null, err => {
                expect(err.message).toBe('The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received null');
                done();
            });
    });

    /**
     * Test if `AES.createKey().pipe(decryptWithAesKey())` lettable operator returns an Observable with error if AES key is wrong
     */
    test('- `AES.createKey().pipe(decryptWithAesKey())` must return an Observable with error if AES key is wrong', (done) => {
        of({ key: null, iv: null })
            .pipe(
                decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
            )
            .subscribe(() => null, err => {
                expect(err.message).toBe('The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received null');
                done();
            });
    });
});
