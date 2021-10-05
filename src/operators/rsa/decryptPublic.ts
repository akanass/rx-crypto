// @ts-ignore
import * as NodeRSA from 'node-rsa';
import { Encoding } from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { Buffer } from 'buffer';

/**
 * New observable operator
 *
 * Decrypting data method with public key
 *
 * @param data {Buffer} - buffer for decrypting
 * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
 *
 * @return {OperatorFunction<NodeRSA, R>}
 */
export const decryptPublic =
  <NodeRSA, R>(data: Buffer | string, encoding?: 'buffer' | Encoding | 'json'): OperatorFunction<NodeRSA, R> =>
    (source: Observable<NodeRSA>) =>
      new Observable<R>((subscriber: Subscriber<R>) => {
        const subscription = source.subscribe({
          next: (nodeRSA: NodeRSA) => {
            try {
              // @ts-ignore
              subscriber.next(nodeRSA.decryptPublic(data, encoding));
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
