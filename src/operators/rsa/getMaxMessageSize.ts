import * as NodeRSA from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return max data size for encrypt in bytes.
 *
 * @return {OperatorFunction<NodeRSA, number>}
 */
export function getMaxMessageSize<NodeRSA>(): OperatorFunction<NodeRSA, number> {
    return (source: Observable<NodeRSA>) => <Observable<number>>source.lift(new GetMaxMessageSizeOperator());
}

/**
 * Operator class definition
 */
class GetMaxMessageSizeOperator<R> implements Operator<NodeRSA, R> {
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
        return source.subscribe(new GetMaxMessageSizeSubscriber(subscriber));
    }
}

/**
 * Operator subscriber class definition
 */
class GetMaxMessageSizeSubscriber<R> extends Subscriber<NodeRSA> {
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
            this.destination.next(nodeRSA.getMaxMessageSize());
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
