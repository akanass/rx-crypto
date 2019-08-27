import { RandomString } from '../../src';

let randomString: RandomString;

describe('- Integration random-string.test.ts file', () => {
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
     * Test if `RandomString.generate()` Observable returns 'string'
     */
    test('- `RandomString.generate()` Observable function must return a string', (done) => {
        randomString.generate().subscribe(_ => {
            expect(typeof _).toBe('string');
            done();
        });
    });

    /**
     * Test if `RandomString.generate()` Observable returns 'string' with 32 chars
     */
    test('- `RandomString.generate()` Observable function must return a string with 32 chars', (done) => {
        randomString.generate(32).subscribe(_ => {
            expect(_).toHaveLength(32);
            done();
        });
    });
});
