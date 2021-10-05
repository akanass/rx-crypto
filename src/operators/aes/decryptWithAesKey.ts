import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { Buffer } from 'buffer';
import { createDecipheriv, Decipher } from 'crypto';
// @ts-ignore
import { AESKeyCreationResult } from '../..';

/**
 * New observable operator
 *
 * Decrypting data method with aes key
 *
 * @param data {Buffer} - data for decrypting.
 *
 * @return {OperatorFunction<AESKeyCreationResult, Buffer>} Buffer of decrypted data
 */
export const decryptWithAesKey = <AESKeyCreationResult>(data: Buffer): OperatorFunction<AESKeyCreationResult, Buffer> =>
  (source: Observable<AESKeyCreationResult>) =>
    new Observable<Buffer>((subscriber: Subscriber<Buffer>) => {
      const subscription = source.subscribe({
        next: (aesKey: AESKeyCreationResult) => {
          try {
            // @ts-ignore
            const decipher: Decipher = createDecipheriv('aes-256-cbc', Buffer.from(aesKey.key, 'hex'), Buffer.from(aesKey.iv, 'hex'));
            const bufDecrypted: Buffer = decipher.update(Buffer.from(data));
            const bufFinal: Buffer = decipher.final();
            let decrypted;

            // check if we have extra content
            /* istanbul ignore else */
            if (bufFinal) {
              decrypted = Buffer.concat([bufDecrypted, bufFinal]);
            } else {
              decrypted = bufDecrypted;
            }

            subscriber.next(decrypted);
            subscriber.complete();
          } catch (e) {
            subscriber.error(e);
          }
        },
        // We need to make sure we're propagating our errors through.
        error: /* istanbul ignore next */(err) => subscriber.error(err),
        complete: () => subscriber.complete()
      });

      // Return the teardown logic. This will be invoked when
      // the result errors, completes, or is unsubscribed.
      return () => subscription.unsubscribe();
    });
