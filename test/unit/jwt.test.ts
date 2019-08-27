import { Observable } from 'rxjs';
import { JWT } from '../../src';

let jwt: JWT;

describe('- Unit jwt.test.ts file', () => {
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
     * Test if `JWT.sign()` function returns an Observable
     */
    test('- `JWT.sign()` function must return an Observable', (done) => {
        expect(jwt.sign(null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `JWT.verify()` function returns an Observable
     */
    test('- `JWT.verify()` function must return an Observable', (done) => {
        expect(jwt.verify(null, null)).toBeInstanceOf(Observable);
        done();
    });

    /**
     * Test if `JWT.decode()` function returns an Observable
     */
    test('- `JWT.decode()` function must return an Observable', (done) => {
        expect(jwt.decode(null)).toBeInstanceOf(Observable);
        done();
    });
});
