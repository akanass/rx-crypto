import * as NodeRSA from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Return true if key pair doesn't have any data.
 *
 * @return {OperatorFunction<NodeRSA, boolean>}
 */
export function isEmptyKey<NodeRSA>(): OperatorFunction<NodeRSA, boolean> {
    return (source: Observable<NodeRSA>) => <Observable<boolean>>source.lift(new IsEmptyKeyOperator());
}

/**
 * Operator class definition
 */
class IsEmptyKeyOperator<R> implements Operator<NodeRSA, R> {
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
        return source.subscribe(new IsEmptyKeySubscriber(subscriber));
    }
}

/**
 * Operator subscriber class definition
 */
class IsEmptyKeySubscriber<R> extends Subscriber<NodeRSA> {
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
            this.destination.next(nodeRSA.isEmpty());
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
