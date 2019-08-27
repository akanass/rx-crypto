import { Buffer } from 'buffer';
import { Cipher, createCipheriv } from 'crypto';
import { Observable, Operator, OperatorFunction, Subscriber } from 'rxjs';
import { AESKeyCreationResult } from '../..';

/**
 * New observable operator
 *
 * Encrypting data method with aes key
 *
 * @param data {Buffer} - data for encrypting.
 *
 * @return {OperatorFunction<AESKeyCreationResult, Buffer>} Buffer of encrypted data
 */
export function encryptWithAesKey<AESKeyCreationResult>(data: Buffer): OperatorFunction<AESKeyCreationResult, Buffer> {
    return (source: Observable<AESKeyCreationResult>) => <Observable<Buffer>>source.lift(new EncryptWithAesKeyOperator(data));
}

/**
 * Operator class definition
 */
class EncryptWithAesKeyOperator<R> implements Operator<AESKeyCreationResult, R> {
    /**
     * Class constructor
     *
     * @param _data {Buffer} - data for encrypting.
     */
    constructor(private _data: Buffer) {
    }

    /**
     * Function calls when operator is executing
     *
     * @param subscriber current subscriber
     * @param source subscriber source
     *
     * @return {AnonymousSubscription|Subscription|Promise<PushSubscription>|TeardownLogic}
     */
    call(subscriber: Subscriber<R>, source: Observable<AESKeyCreationResult>): any {
        return source.subscribe(new EncryptWithAesKeySubscriber(subscriber, this._data));
    }
}

/**
 * Operator subscriber class definition
 */
class EncryptWithAesKeySubscriber<R> extends Subscriber<AESKeyCreationResult> {
    /**
     * Class constructor
     *
     * @param destination subscriber destination
     * @param _data {Buffer} - data for encrypting.
     */
    constructor(destination: Subscriber<R>, private _data: Buffer) {
        super(destination);
    }

    /**
     * Function to send result to next subscriber
     *
     * @param aesKey key from previous subscriber
     *
     * @private
     */
    protected _next(aesKey: AESKeyCreationResult): void {
        try {
            const cipher: Cipher = createCipheriv('aes-256-cbc', Buffer.from(aesKey.key, 'hex'), Buffer.from(aesKey.iv, 'hex'));
            const bufEncrypted: Buffer = cipher.update(Buffer.from(this._data));
            const bufFinal: Buffer = cipher.final();
            let encrypted;

            // check if we have extra content
            /* istanbul ignore else */
            if (bufFinal) {
                encrypted = Buffer.concat([ bufEncrypted, bufFinal ]);
            } else {
                encrypted = bufEncrypted;
            }

            this.destination.next(encrypted);
            this.destination.complete();
        } catch (e) {
            this.destination.error(e);
        }
    }
}
