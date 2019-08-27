import { Format, Key } from 'node-rsa';
import { MonoTypeOperatorFunction, Observable, Operator, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Import key from PEM string, PEM/DER Buffer or components.
 *
 * @param key key from PEM string, PEM/DER Buffer or components
 * @param format key format
 *
 * @return {MonoTypeOperatorFunction<NodeRSA>}
 */
export function importKey<NodeRSA>(key: Key, format?: Format): MonoTypeOperatorFunction<NodeRSA> {
    return (source: Observable<NodeRSA>) => <Observable<NodeRSA>>source.lift(new ImportKeyOperator(key, format));
}

/**
 * Operator class definition
 */
class ImportKeyOperator<NodeRSA> implements Operator<NodeRSA, NodeRSA> {
    /**
     * Class constructor
     *
     * @param _key key from PEM string, PEM/DER Buffer or components
     * @param _format key format
     */
    constructor(private _key: Key, private _format?: Format) {
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
        return source.subscribe(new ImportKeySubscriber(subscriber, this._key, this._format));
    }
}

/**
 * Operator subscriber class definition
 */
class ImportKeySubscriber<NodeRSA> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _key key from PEM string, PEM/DER Buffer or components
     * @param _format key format
     */
    constructor(destination: Subscriber<NodeRSA>, private _key: Key, private _format?: Format) {
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
            (<any>nodeRSA).importKey(this._key, this._format);
            this.destination.next(nodeRSA);
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
