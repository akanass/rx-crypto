import * as NodeRSA from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return true if key is private.
 *
 * @return {OperatorFunction<NodeRSA, boolean>}
 */
export function isPrivate<NodeRSA>(): OperatorFunction<NodeRSA, boolean> {
    return (source: Observable<NodeRSA>) => <Observable<boolean>>source.lift(new IsPrivateOperator());
}

/**
 * Operator class definition
 */
class IsPrivateOperator<R> implements Operator<NodeRSA, R> {
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
        return source.subscribe(new IsPrivateSubscriber(subscriber));
    }
}

/**
 * Operator subscriber class definition
 */
class IsPrivateSubscriber<R> extends Subscriber<NodeRSA> {
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
            this.destination.next(!!nodeRSA.isPrivate());
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
