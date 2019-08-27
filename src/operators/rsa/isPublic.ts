import * as NodeRSA from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * @param strict if true method will return false if key pair have private exponent. Default false.
 *
 * @return {OperatorFunction<NodeRSA, boolean>}
 */
export function isPublic<NodeRSA>(strict?: boolean): OperatorFunction<NodeRSA, boolean> {
    return (source: Observable<NodeRSA>) => <Observable<boolean>>source.lift(new IsPublicOperator(strict));
}

/**
 * Operator class definition
 */
class IsPublicOperator<R> implements Operator<NodeRSA, R> {
    /**
     * Class constructor
     *
     * @param _strict if true method will return false if key pair have private exponent. Default false.
     */
    constructor(private _strict?: boolean) {
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
        return source.subscribe(new IsPublicSubscriber(subscriber, this._strict));
    }
}

/**
 * Operator subscriber class definition
 */
class IsPublicSubscriber<R> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _strict if true method will return false if key pair have private exponent. Default false.
     */
    constructor(destination: Subscriber<R>, private _strict?: boolean) {
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
            this.destination.next(!!nodeRSA.isPublic(this._strict));
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
