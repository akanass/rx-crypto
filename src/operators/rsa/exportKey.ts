// @ts-ignore
import * as NodeRSA from 'node-rsa';
import { Format, Key } from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Export key to PEM string, PEM/DER Buffer or components.
 *
 * @param format key format
 *
 * @return {OperatorFunction<NodeRSA, Key>}
 */
export const exportKey = <NodeRSA>(format?: Format): OperatorFunction<NodeRSA, Key> =>
  (source: Observable<NodeRSA>) =>
    new Observable<Key>((subscriber: Subscriber<Key>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            subscriber.next(nodeRSA.exportKey(format));
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
