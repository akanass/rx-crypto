import { MonoTypeOperatorFunction, Observable, Operator, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * @param bits Key size in bits. 2048 by default.
 * @param exponent public exponent. 65537 by default.
 *
 * @return {MonoTypeOperatorFunction<NodeRSA>}
 */

export function generateKeyPair<NodeRSA>(bits?: number, exponent?: number): MonoTypeOperatorFunction<NodeRSA> {
    return (source: Observable<NodeRSA>) => <Observable<NodeRSA>>source.lift(new GenerateKeyPairOperator(bits, exponent));
}

/**
 * Operator class definition
 */
class GenerateKeyPairOperator<NodeRSA> implements Operator<NodeRSA, NodeRSA> {
    /**
     * Class constructor
     *
     * @param _bits Key size in bits. 2048 by default.
     * @param _exponent public exponent. 65537 by default.
     */
    constructor(private _bits?: number, private _exponent?: number) {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<NodeRSA>, source: Observable<NodeRSA>): any {
        return source.subscribe(new GenerateKeyPairSubscriber(subscriber, this._bits, this._exponent));
    }
}

/**
 * Operator subscriber class definition
 */
class GenerateKeyPairSubscriber<NodeRSA> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _bits Key size in bits. 2048 by default.
     * @param _exponent public exponent. 65537 by default.
     */
    constructor(destination: Subscriber<NodeRSA>, private _bits?: number, private _exponent?: number) {
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
            (<any>nodeRSA).generateKeyPair(this._bits, this._exponent);
            this.destination.next(nodeRSA);
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
