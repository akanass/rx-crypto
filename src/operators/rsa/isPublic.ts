// @ts-ignore
import * as NodeRSA from 'node-rsa';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * @param strict if true method will return false if key pair have private exponent. Default false.
 *
 * @return {OperatorFunction<NodeRSA, boolean>}
 */
export const isPublic = <NodeRSA>(strict?: boolean): OperatorFunction<NodeRSA, boolean> =>
  (source: Observable<NodeRSA>) =>
    new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            subscriber.next(nodeRSA.isPublic(strict));
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
