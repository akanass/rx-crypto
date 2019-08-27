import { Observable } from 'rxjs';
import { RSA } from '../../src';
import {
    decryptPrivate,
    decryptPublic,
    encryptPrivate,
    encryptPublic,
    exportKey,
    generateKeyPair,
    getKeySize,
    getMaxMessageSize,
    importKey,
    isEmptyKey,
    isPrivate,
    isPublic,
    sign,
    verify
} from '../../src/operators/rsa';

let rsa: RSA;

describe('- Unit rsa.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        rsa = new RSA();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        rsa = undefined;
    });

    /**
     * Test if `RSA.createKey()` function returns an Observable
     */
    test('- `RSA.createKey()` function must return an Observable', (done) => {
        expect(rsa.createKey()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey()` function returns an Observable
     */
    test('- `RSA.loadKey()` function must return an Observable', (done) => {
        expect(rsa.loadKey(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.createKey().pipe(importKey())` function returns an Observable
     */
    test('- `RSA.createKey().pipe(importKey())` function must return an Observable', (done) => {
        expect(
            rsa.createKey()
                .pipe(
                    importKey(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.createKey().pipe(generateKeyPair())` function returns an Observable
     */
    test('- `RSA.createKey().pipe(generateKeyPair())` function must return an Observable', (done) => {
        expect(
            rsa.createKey()
                .pipe(
                    generateKeyPair()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(exportKey())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(exportKey())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    exportKey()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(isPrivate())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(isPrivate())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    isPrivate()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(isPublic())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(isPublic())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    isPublic()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(isEmptyKey())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(isEmptyKey())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    isEmptyKey()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(getKeySize())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(getKeySize())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    getKeySize()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(getMaxMessageSize())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(getMaxMessageSize())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    getMaxMessageSize()
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(encryptPublic())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(encryptPublic())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    encryptPublic(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(encryptPrivate())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(encryptPrivate())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    encryptPrivate(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(decryptPrivate())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(decryptPrivate())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    decryptPrivate(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(decryptPublic())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(decryptPublic())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    decryptPublic(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(sign())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(sign())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    sign(null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `RSA.loadKey().pipe(verify())` function returns an Observable
     */
    test('- `RSA.loadKey().pipe(verify())` function must return an Observable', (done) => {
        expect(
            rsa.loadKey(null)
                .pipe(
                    verify(null, null)
                )
        ).toBeInstanceOf(Observable);
        done();
    });
});
