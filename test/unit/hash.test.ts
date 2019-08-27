import { Observable } from 'rxjs';
import { Hash } from '../../src';

let hash: Hash;

describe('- Unit hash.service.test.ts file', () => {
    /**
     * Function executed before each test
     */
    beforeEach(() => {
        hash = new Hash();
    });

    /**
     * Function executed after each test
     */
    afterEach(() => {
        hash = undefined;
    });

    /**
     * Test if `Hash.generate()` function returns an Observable
     */
    test('- `Hash.generate()` function must return an Observable', (done) => {
        expect(hash.generate(null, null, null, null, null)).toBeInstanceOf(Observable);
        done();
    });
});
