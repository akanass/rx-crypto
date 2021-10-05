// @ts-ignore
import * as NodeRSA from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return max data size for encrypt in bytes.
 *
 * @return {OperatorFunction<NodeRSA, number>}
 */
export const getMaxMessageSize = <NodeRSA>(): OperatorFunction<NodeRSA, number> =>
  (source: Observable<NodeRSA>) =>
    new Observable<number>((subscriber: Subscriber<number>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            subscriber.next(nodeRSA.getMaxMessageSize());
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
