import * as NodeRSA from 'node-rsa';
import { Data, Encoding } from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { Buffer } from 'buffer';

/**
 * New observable operator
 *
 * Signing data
 *
 * @param data {string|number|object|array|Buffer} - data for signing. Object and array will convert to JSON string.
 * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 *
 * @return {OperatorFunction<NodeRSA, R>}
 */
export const sign =
  <T, R>(data: Data | Buffer,
               encoding?: 'buffer' | Encoding,
               sourceEncoding?: Encoding): OperatorFunction<NodeRSA, R> =>
    (source: Observable<NodeRSA>) =>
      new Observable<R>((subscriber: Subscriber<R>) => {
        const subscription = source.subscribe({
          next: (nodeRSA: NodeRSA) => {
            try {
              // @ts-ignore
              subscriber.next(nodeRSA.sign(data, encoding, sourceEncoding));
              subscriber.complete();
            } catch (e) {
              subscriber.error(e);
            }
          },
          // We need to make sure we're propagating our errors through.
          error: /* istanbul ignore next */(err) => subscriber.error(err),
          complete: () => subscriber.complete()
        });

        // Return the teardown logic. This will be invoked when
        // the result errors, completes, or is unsubscribed.
        return () => subscription.unsubscribe();
      });
