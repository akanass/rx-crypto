import { Observable } from 'rxjs';
import { RandomString } from '../../src';

let randomString: RandomString;

describe('- Unit random-string.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        randomString = new RandomString();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        randomString = undefined;
    });

    /**
     * Test if `RandomString.generate()` function returns an Observable
     */
    test('- `RandomString.generate()` function must return an Observable', (done) => {
        expect(randomString.generate()).toBeInstanceOf(Observable);
        done();
    });
});
