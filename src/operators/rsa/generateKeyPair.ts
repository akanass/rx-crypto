import { MonoTypeOperatorFunction, Observable, Subscriber } from 'rxjs';
// @ts-ignore
import * as NodeRSA from 'node-rsa';

/**
 * New observable operator
 *
 * @param bits Key size in bits. 2048 by default.
 * @param exponent public exponent. 65537 by default.
 *
 * @return {MonoTypeOperatorFunction<NodeRSA>}
 */
export const generateKeyPair = <NodeRSA>(bits?: number, exponent?: number): MonoTypeOperatorFunction<NodeRSA> =>
  (source: Observable<NodeRSA>) =>
    new Observable<NodeRSA>((subscriber: Subscriber<NodeRSA>) => {
      const subscription = source.subscribe({
        next: (nodeRSA: NodeRSA) => {
          try {
            // @ts-ignore
            nodeRSA.generateKeyPair(bits, exponent);
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
