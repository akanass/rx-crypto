// @ts-ignore
import * as NodeRSA from 'node-rsa';
import { Format, Key } from 'node-rsa';
import { MonoTypeOperatorFunction, Observable, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Import key from PEM string, PEM/DER Buffer or components.
 *
 * @param key key from PEM string, PEM/DER Buffer or components
 * @param format key format
 *
 * @return {MonoTypeOperatorFunction<NodeRSA>}
 */
export const importKey = <NodeRSA>(key: Key, format?: Format): MonoTypeOperatorFunction<NodeRSA> =>
  (source: Observable<NodeRSA>) =>
    new Observable<NodeRSA>((subscriber: Subscriber<NodeRSA>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            nodeRSA.importKey(key, format);
            subscriber.next(nodeRSA);
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
