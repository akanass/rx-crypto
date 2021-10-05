import * as NodeRSA from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return true if key is private.
 *
 * @return {OperatorFunction<NodeRSA, boolean>}
 */
export const isPrivate = (): OperatorFunction<NodeRSA, boolean> =>
  (source: Observable<NodeRSA>) =>
    new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            subscriber.next(nodeRSA.isPrivate());
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
