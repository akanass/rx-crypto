import { flatMap } from 'rxjs/operators';
import {
    CertificateCreationResult,
    CertificateSubjectReadResult,
    CSRCreationResult,
    DhParamInfoResult,
    DhParamKeyCreationResult,
    EcParamKeyCreationResult,
    FingerprintResult,
    KeyPairCreationResult,
    ModulusResult,
    PEM,
    PKCS12CreationResult,
    PrivateKeyCreationResult,
    PublicKeyCreationResult
} from '../../src';

let pem: PEM;

describe('- Integration pem.service.test.ts file', () => {
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
     * Test if `PEM.createPrivateKey()` Observable returns `PrivateKeyCreationResult` object `{key}`
     */
    test('- `PEM.createPrivateKey()` Observable must return a `PrivateKeyCreationResult` object `{key}`', (done) => {
        pem.createPrivateKey()
            .subscribe((privateKeyCreationResult: PrivateKeyCreationResult) => {
                expect(privateKeyCreationResult).toHaveProperty('key');
                done();
            });
    });

    /**
     * Test if `PEM.createDhparam()` Observable returns `DhParamKeyCreationResult` object `{dhparam}`
     */
    test('- `PEM.createDhparam()` Observable must return a `DhParamKeyCreationResult` object `{dhparam}`', (done) => {
        pem.createDhparam()
            .subscribe((dhParamKeyCreationResult: DhParamKeyCreationResult) => {
                expect(dhParamKeyCreationResult).toHaveProperty('dhparam');
                done();
            });
    });

    /**
     * Test if `PEM.createEcparam()` Observable returns `EcParamKeyCreationResult` object `{ecparam}`
     */
    test('- `PEM.createEcparam()` Observable must return a `EcParamKeyCreationResult` object `{ecparam}`', (done) => {
        pem.createEcparam()
            .subscribe((ecParamKeyCreationResult: EcParamKeyCreationResult) => {
                expect(ecParamKeyCreationResult).toHaveProperty('ecparam');
                done();
            });
    });

    /**
     * Test if `PEM.createCSR()` Observable returns `CSRCreationResult` object `{csr, clientKey}`
     */
    test('- `PEM.createCSR()` Observable must return a `CSRCreationResult` object `{csr, clientKey}`', (done) => {
        pem.createCSR()
            .subscribe((csrCreationResult: CSRCreationResult) => {
                expect(csrCreationResult).toHaveProperty('csr');
                expect(csrCreationResult).toHaveProperty('clientKey');
                done();
            });
    });

    /**
     * Test if `PEM.createCertificate()` Observable returns `CertificateCreationResult` object
     * `{certificate, csr, clientKey, serviceKey}`
     */
    test('- `PEM.createCertificate()` Observable must return a `CertificateCreationResult` object ' +
        '`{certificate, csr, clientKey, serviceKey}`', (done) => {
        pem.createCertificate()
            .subscribe((certificateCreationResult: CertificateCreationResult) => {
                expect(certificateCreationResult).toHaveProperty('certificate');
                expect(certificateCreationResult).toHaveProperty('csr');
                expect(certificateCreationResult).toHaveProperty('clientKey');
                expect(certificateCreationResult).toHaveProperty('serviceKey');
                done();
            });
    });

    /**
     * Test if `PEM.readCertificateInfo()` Observable returns `CertificateSubjectReadResult` object
     * `{country, state, locality, organization, organizationUnit, commonName, emailAddress}`
     */
    test('- `PEM.readCertificateInfo()` Observable must return a `CertificateSubjectReadResult` object ' +
        '`{country, state, locality, organization, organizationUnit, commonName, emailAddress}`', (done) => {
        pem.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pem.readCertificateInfo(c.certificate))
            )
            .subscribe((certificateSubjectReadResult: CertificateSubjectReadResult) => {
                expect(certificateSubjectReadResult).toHaveProperty('country');
                expect(certificateSubjectReadResult).toHaveProperty('state');
                expect(certificateSubjectReadResult).toHaveProperty('locality');
                expect(certificateSubjectReadResult).toHaveProperty('organization');
                expect(certificateSubjectReadResult).toHaveProperty('organizationUnit');
                expect(certificateSubjectReadResult).toHaveProperty('commonName');
                expect(certificateSubjectReadResult).toHaveProperty('emailAddress');
                done();
            });
    });

    /**
     * Test if `PEM.getPublicKey()` Observable returns `PublicKeyCreationResult` object {publicKey}`
     */
    test('- `PEM.getPublicKey()` Observable must return a `PublicKeyCreationResult` object `{publicKey}`', (done) => {
        pem.createPrivateKey()
            .pipe(
                flatMap((c: PrivateKeyCreationResult) => pem.getPublicKey(c.key))
            )
            .subscribe((publicKeyCreationResult: PublicKeyCreationResult) => {
                expect(publicKeyCreationResult).toHaveProperty('publicKey');
                done();
            });
    });

    /**
     * Test if `PEM.createKeyPair()` Observable returns `KeyPairCreationResult` object `{key, publicKey}`
     */
    test('- `PEM.createKeyPair()` Observable must return a `KeyPairCreationResult` object `{key, publicKey}`', (done) => {
        pem.createKeyPair()
            .subscribe((keyPairCreationResult: KeyPairCreationResult) => {
                expect(keyPairCreationResult).toHaveProperty('key');
                expect(keyPairCreationResult).toHaveProperty('publicKey');
                done();
            });
    });

    /**
     * Test if `PEM.getFingerprint()` Observable returns `FingerprintResult` object {fingerprint}`
     */
    test('- `PEM.getFingerprint()` Observable must return a `FingerprintResult` object `{fingerprint}`', (done) => {
        pem.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pem.getFingerprint(c.certificate))
            )
            .subscribe((fingerprintResult: FingerprintResult) => {
                expect(fingerprintResult).toHaveProperty('fingerprint');
                done();
            });
    });

    /**
     * Test if `PEM.getModulus()` Observable returns `ModulusResult` object {modulus}`
     */
    test('- `PEM.getModulus()` Observable must return a `ModulusResult` object `{modulus}`', (done) => {
        pem.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pem.getModulus(c.certificate))
            )
            .subscribe((modulusResult: ModulusResult) => {
                expect(modulusResult).toHaveProperty('modulus');
                done();
            });
    });

    /**
     * Test if `PEM.getDhparamInfo()` Observable returns `DhParamInfoResult` object {size, prime}`
     */
    test('- `PEM.getDhparamInfo()` Observable must return a `DhParamInfoResult` object `{size, prime}`', (done) => {
        pem.createDhparam()
            .pipe(
                flatMap((dh: DhParamKeyCreationResult) => pem.getDhparamInfo(dh.dhparam))
            )
            .subscribe((dhParamInfoResult: DhParamInfoResult) => {
                expect(dhParamInfoResult).toHaveProperty('size');
                expect(dhParamInfoResult).toHaveProperty('prime');
                done();
            });
    });

    /**
     * Test if `PEM.createPkcs12()` Observable returns `PKCS12CreationResult` object {pkcs12}`
     */
    test('- `PEM.createPkcs12()` Observable must return a `PKCS12CreationResult` object `{pkcs12}`', (done) => {
        pem.createPrivateKey()
            .pipe(
                flatMap((pk: PrivateKeyCreationResult) =>
                    pem.createCertificate({
                        clientKey: pk.key,
                        selfSigned: true
                    })
                ),
                flatMap((c: CertificateCreationResult) => pem.createPkcs12(c.clientKey, c.certificate, 'password'))
            )
            .subscribe((pkcs12Result: PKCS12CreationResult) => {
                expect(pkcs12Result).toHaveProperty('pkcs12');
                done();
            });
    });

    /**
     * Test if `PEM.readPkcs12()` Observable returns an error if no pkcs12 is provided
     */
    test('- `PEM.readPkcs12()` Observable must return an error if no pkcs12 is provided', (done) => {
        pem.readPkcs12('/i/do/not/exist.p12').subscribe(() => null, err => {
            expect(err.message).toBe('Cannot read property \'p12Password\' of undefined');
            done();
        });
    });

    /**
     * Test if `PEM.checkPkcs12()` Observable returns true
     */
    test('- `PEM.createPkcs12()` Observable must return true', (done) => {
        pem.createPrivateKey()
            .pipe(
                flatMap((pk: PrivateKeyCreationResult) =>
                    pem.createCertificate({
                        clientKey: pk.key,
                        selfSigned: true
                    })
                ),
                flatMap((c: CertificateCreationResult) => pem.createPkcs12(c.clientKey, c.certificate, 'password')),
                flatMap((pkcs12Result: PKCS12CreationResult) => pem.checkPkcs12(pkcs12Result.pkcs12, 'password'))
            )
            .subscribe((isValid: boolean) => {
                expect(isValid).toBeTruthy();
                done();
            });
    });

    /**
     * Test if `PEM.verifySigningChain()` Observable returns true
     */
    test('- `PEM.verifySigningChain()` Observable must return true', (done) => {
        pem.createCertificate({ commonName: 'CA Certificate' })
            .pipe(
                flatMap((ca: CertificateCreationResult) =>
                    pem.createCertificate({
                        serviceKey: ca.serviceKey, serviceCertificate: ca.certificate, serial: Date.now()
                    })
                        .pipe(
                            flatMap((cert: CertificateCreationResult) =>
                                pem.verifySigningChain(cert.certificate, ca.certificate)
                            )
                        )
                )
            )
            .subscribe((isValid: boolean) => {
                expect(isValid).toBeTruthy();
                done();
            });
    });

    /**
     * Test if `PEM.checkCertificate()` Observable returns true
     */
    test('- `PEM.checkCertificate()` Observable must return true', (done) => {
        pem.createCertificate()
            .pipe(
                flatMap((c: CertificateCreationResult) => pem.checkCertificate(c.certificate))
            )
            .subscribe((isValid: boolean) => {
                expect(isValid).toBeTruthy();
                done();
            });
    });

    /**
     * Test if `PEM.createPrivateKey()` Observable returns an error if openSSL path is wrong
     */
    test('- check if `PEM.createPrivateKey()` Observable returns an error if openSSL path is wrong', (done) => {
        const ps = new PEM({ pathOpenSSL: '/' });
        ps.createPrivateKey().subscribe(() => null, err => {
            expect(err.message).toBe('Could not find openssl on your system on this path: /');
            done();
        });
    });
});
