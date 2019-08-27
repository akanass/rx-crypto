import { Observable, of } from 'rxjs';
import { GenerateOptions, generate } from 'randomstring';

export class RandomString {
    /**
     * Function to generate a random string
     *
     * @param {GenerateOptions | number} [options] Optional object or number to configure data of generation
     *
     * @return {Observable<string>}
     */
    generate(options?: GenerateOptions | number): Observable<string> {
        return of(generate(options));
    }
}

/**
 * Export randomstring interfaces
 */
export { GenerateOptions };
