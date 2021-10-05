// @ts-ignore
import * as NodeRSA from 'node-rsa';
import { Data, Encoding } from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { Buffer } from 'buffer';

/**
 * New observable operator
 *
 * Verifying signed data
 *
 * @param data {string|number|object|array|Buffer} - signed data.
 * @param signature {string|Buffer} - signature from sign method.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 * @param signatureEncoding {string} - optional. Encoding of given signature.
 *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 *
 * @return {OperatorFunction<NodeRSA, R>}
 */
export const verify =
  <NodeRSA, R>(data: Data | Buffer, signature: string | Buffer,
               sourceEncoding?: Encoding, signatureEncoding?: Encoding): OperatorFunction<NodeRSA, R> =>
    (source: Observable<NodeRSA>) =>
      new Observable<R>((subscriber: Subscriber<R>) => {
        const subscription = source.subscribe({
          next: (nodeRSA: NodeRSA) => {
            try {
              // @ts-ignore
              subscriber.next(nodeRSA.verify(data, signature, sourceEncoding, signatureEncoding));
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
