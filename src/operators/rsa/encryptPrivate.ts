import * as NodeRSA from 'node-rsa';
import { Data, Encoding } from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Encrypting data method with private key
 *
 * @param data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
 * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 *
 * @return {OperatorFunction<NodeRSA, R>}
 */
export function encryptPrivate<NodeRSA, R>(data: Data | Buffer,
                                           encoding?: 'buffer' | Encoding,
                                           sourceEncoding?: Encoding): OperatorFunction<NodeRSA, R> {
    return (source: Observable<NodeRSA>) => <Observable<R>>source.lift(new EncryptPrivateOperator(data, encoding, sourceEncoding));
}

/**
 * Operator class definition
 */
class EncryptPrivateOperator<R> implements Operator<NodeRSA, R> {
    /**
     * Class constructor
     *
     * @param _data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
     * @param _encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     */
    constructor(private _data: Data | Buffer, private _encoding?: 'buffer' | Encoding, private _sourceEncoding?: Encoding) {
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
        return source.subscribe(new EncryptPrivateSubscriber(subscriber, this._data, this._encoding, this._sourceEncoding));
    }
}

/**
 * Operator subscriber class definition
 */
class EncryptPrivateSubscriber<R> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _data {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
     * @param _encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     */
    constructor(destination: Subscriber<R>, private _data: Data | Buffer, private _encoding?: 'buffer' | Encoding,
                private _sourceEncoding?: Encoding) {
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
            this.destination.next(nodeRSA.encryptPrivate(<any>this._data, <any>this._encoding, this._sourceEncoding));
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
