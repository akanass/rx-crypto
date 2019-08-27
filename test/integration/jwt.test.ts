import { JsonWebTokenError, JWT } from '../../src';

let jwt: JWT;

describe('- Integration jwt.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        jwt = new JWT();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        jwt = undefined;
    });

    /**
     * Test if `JWT.sign()` Observable returns a string
     */
    test('- `JWT.sign()` function must return an Observable', (done) => {
        jwt.sign({ data: 'data to sign' }, Buffer.from('secret to sign JWT'))
            .subscribe((jwt: string) => {
                expect(typeof jwt).toBe('string');
                done();
            });
    });

    /**
     * Test if `JWT.sign()` Observable returns an error if RSA signature without PEM private key
     */
    test('- `JWT.sign()` Observable must return an error if RSA signature without PEM private key', (done) => {
        jwt.sign({ data: 'data to sign' }, Buffer.from('secret to sign JWT'), { algorithm: 'RS512' })
            .subscribe(() => null, err => {
                expect(err).toHaveProperty('message', 'error:0909006C:PEM routines:get_name:no start line');
                done();
            });
    });

    /**
     * Test if `JWT.verify()` Observable returns a payload object with signature verification
     */
    test('- `JWT.verify()` Observable must return a payload object with signature verification', (done) => {
        jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ' +
            '.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI', Buffer.from('secret to sign JWT'))
            .subscribe((payload: object) => {
                expect(payload).toHaveProperty('data', 'data to sign');
                done();
            });
    });

    /**
     * Test if `JWT.verify()` Observable returns an error if signature is missing in JWT
     */
    test('- `JWT.verify()` Observable must return an error if signature is missing in JWT', (done) => {
        jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ',
            Buffer.from('secret to sign JWT'))
            .subscribe(() => null, (err: JsonWebTokenError) => {
                expect(err).toHaveProperty('name', 'JsonWebTokenError');
                done();
            });
    });

    /**
     * Test if `JWT.decode()` Observable returns a payload object without signature verification
     */
    test('- `JWT.decode()` Observable must return a payload object without signature verification', (done) => {
        jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZGF0YSB0byBzaWduIiwiaWF0IjoxNTAxNTk4MzE0fQ' +
            '.f0B-YNbl9qIbHgDRMcDBxZDrQN5UiLkX5_9McwNvHZI')
            .subscribe((payload: object) => {
                expect(payload).toHaveProperty('data', 'data to sign');
                done();
            });
    });
});
