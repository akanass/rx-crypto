import * as NodeRSA from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return key size in bits.
 *
 * @return {OperatorFunction<NodeRSA, number>}
 */
export const getKeySize = (): OperatorFunction<NodeRSA, number> =>
  (source: Observable<NodeRSA>) =>
    new Observable<number>((subscriber: Subscriber<number>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            subscriber.next(nodeRSA.getKeySize());
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
