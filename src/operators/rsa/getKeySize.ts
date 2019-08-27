import * as NodeRSA from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return key size in bits.
 *
 * @return {OperatorFunction<NodeRSA, number>}
 */
export function getKeySize<NodeRSA>(): OperatorFunction<NodeRSA, number> {
    return (source: Observable<NodeRSA>) => <Observable<number>>source.lift(new GetKeySizeOperator());
}

/**
 * Operator class definition
 */
class GetKeySizeOperator<R> implements Operator<NodeRSA, R> {
    /**
     * Class constructor
     */
    constructor() {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<R>, source: Observable<NodeRSA>): any {
        return source.subscribe(new GetKeySizeSubscriber(subscriber));
    }
}

/**
 * Operator subscriber class definition
 */
class GetKeySizeSubscriber<R> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     */
    constructor(destination: Subscriber<R>) {
        super(destination);
    }

    /**
     * Function to send result to next subscriber
     *
     * @param nodeRSA object from previous subscriber
     *
     * @private
     */
    protected _next(nodeRSA: NodeRSA): void {
        try {
            this.destination.next(nodeRSA.getKeySize());
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
