import { Observable } from 'rxjs';
import { PEM } from '../../src';

let pem: PEM;

describe('- Unit pem.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        pem = new PEM();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        pem = undefined;
    });

    /**
     * Test if `PEM.createPrivateKey()` function returns an Observable
     */
    test('- `PEM.createPrivateKey()` function must return an Observable', (done) => {
        expect(pem.createPrivateKey()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.createDhparam()` function returns an Observable
     */
    test('- `PEM.createDhparam()` function must return an Observable', (done) => {
        expect(pem.createDhparam()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.createCSR()` function returns an Observable
     */
    test('- `PEM.createCSR()` function must return an Observable', (done) => {
        expect(pem.createCSR()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.createCertificate()` function returns an Observable
     */
    test('- `PEM.createCertificate()` function must return an Observable', (done) => {
        expect(pem.createCertificate()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.readCertificateInfo()` function returns an Observable
     */
    test('- `PEM.readCertificateInfo()` function must return an Observable', (done) => {
        expect(pem.readCertificateInfo(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.getPublicKey()` function returns an Observable
     */
    test('- `PEM.getPublicKey()` function must return an Observable', (done) => {
        expect(pem.getPublicKey(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.createKeyPair()` function returns an Observable
     */
    test('- `PEM.createKeyPair()` function must return an Observable', (done) => {
        expect(pem.createKeyPair()).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.getFingerprint()` function returns an Observable
     */
    test('- `PEM.getFingerprint()` function must return an Observable', (done) => {
        expect(pem.getFingerprint(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.getModulus()` function returns an Observable
     */
    test('- `PEM.getModulus()` function must return an Observable', (done) => {
        expect(pem.getModulus(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.getDhparamInfo()` function returns an Observable
     */
    test('- `PEM.getDhparamInfo()` function must return an Observable', (done) => {
        expect(pem.getDhparamInfo(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.createPkcs12()` function returns an Observable
     */
    test('- `PEM.createPkcs12()` function must return an Observable', (done) => {
        expect(pem.createPkcs12(null, null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.readPkcs12()` function returns an Observable
     */
    test('- `PEM.readPkcs12()` function must return an Observable', (done) => {
        expect(pem.readPkcs12(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.checkPkcs12()` function returns an Observable
     */
    test('- `PEM.checkPkcs12()` function must return an Observable', (done) => {
        expect(pem.checkPkcs12(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.verifySigningChain()` function returns an Observable
     */
    test('- `PEM.verifySigningChain()` function must return an Observable', (done) => {
        expect(pem.verifySigningChain(null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.checkCertificate()` function returns an Observable
     */
    test('- `PEM.checkCertificate()` function must return an Observable', (done) => {
        expect(pem.checkCertificate(null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `PEM.createEcparam()` function returns an Observable
     */
    test('- `PEM.createEcparam()` function must return an Observable', (done) => {
        expect(pem.createEcparam()).toBeInstanceOf(Observable);
        done();
    });
});
