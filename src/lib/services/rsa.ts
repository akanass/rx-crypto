import * as NodeRSA from 'node-rsa';
import { Data, Encoding, Format, Key, KeyBits, Options } from 'node-rsa';
import { Observable } from 'rxjs';

export class RSA {
    /**
     * Generate new key with length specified.
     *
     * @param keyBits
     *
     * @return {any}
     */
    createKey(keyBits?: KeyBits): Observable<NodeRSA> {
        return new Observable(observer => {
            try {
                const nodeRSA = new NodeRSA(keyBits);
                observer.next(nodeRSA);
                observer.complete();
            } catch (e) {
                observer.error(e);
            }
        });
    }

    /**
     * Load key from string/buffer/components.
     *
     * @param key
     * @param format
     * @param options
     *
     * @return {any}
     */
    loadKey(key: Key, format?: Format, options?: Options): Observable<NodeRSA> {
        return new Observable(observer => {
            try {
                const nodeRSA = new NodeRSA(key, format, options);
                observer.next(nodeRSA);
                observer.complete();
            } catch (e) {
                observer.error(e);
            }
        });
    }
}

/**
 * Export rsa interfaces
 */
export { NodeRSA, KeyBits, Key, Format, Options, Encoding, Data };
