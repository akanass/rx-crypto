import * as NodeRSA from 'node-rsa';
import { Data, Encoding } from 'node-rsa';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';

/**
 * New observable operator
 *
 * Verifying signed data
 *
 * @param data {string|number|object|array|Buffer} - signed data.
 * @param signature {string|Buffer} - signature from sign method.
 * @param sourceEncoding {string} - optional. Encoding for given string. Default utf8.
 * @param signatureEncoding {string} - optional. Encoding of given signature.
 *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
 *
 * @return {OperatorFunction<NodeRSA, R>}
 */
export function verify<NodeRSA, R>(data: Data | Buffer, signature: string | Buffer,
                                   sourceEncoding?: Encoding, signatureEncoding?: Encoding): OperatorFunction<NodeRSA, R> {
    return (source: Observable<NodeRSA>) =>
        <Observable<R>>source.lift(new VerifyOperator(data, signature, sourceEncoding, signatureEncoding));
}

/**
 * Operator class definition
 */
class VerifyOperator<R> implements Operator<NodeRSA, R> {
    /**
     * Class constructor
     *
     * @param _data {string|number|object|array|Buffer} - signed data.
     * @param _signature {string|Buffer} - signature from sign method.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     * @param _signatureEncoding {string} - optional. Encoding of given signature.
     *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     */
    constructor(private _data: Data | Buffer, private _signature: string | Buffer,
                private _sourceEncoding?: Encoding, private _signatureEncoding?: Encoding) {
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
        return source.subscribe(new VerifySubscriber(subscriber, this._data, this._signature, this._sourceEncoding,
            this._signatureEncoding));
    }
}

/**
 * Operator subscriber class definition
 */
class VerifySubscriber<R> extends Subscriber<NodeRSA> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _data {string|number|object|array|Buffer} - signed data.
     * @param _signature {string|Buffer} - signature from sign method.
     * @param _sourceEncoding {string} - optional. Encoding for given string. Default utf8.
     * @param _signatureEncoding {string} - optional. Encoding of given signature.
     *          May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
     */
    constructor(destination: Subscriber<R>, private _data: Data | Buffer, private _signature: string | Buffer,
                private _sourceEncoding?: Encoding, private _signatureEncoding?: Encoding) {
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
            this.destination.next(nodeRSA.verify(this._data, <any>this._signature, <any>this._sourceEncoding, this._signatureEncoding));
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
