import { Buffer } from 'buffer';
import { Cipher, createCipheriv } from 'crypto';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';
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
export const encryptWithAesKey = (data: Buffer): OperatorFunction<AESKeyCreationResult, Buffer> =>
  (source: Observable<AESKeyCreationResult>) =>
    new Observable<Buffer>((subscriber: Subscriber<Buffer>) => {
      const subscription = source.subscribe({
        next: (aesKey: AESKeyCreationResult) => {
          try {
            // @ts-ignore
            const cipher: Cipher = createCipheriv('aes-256-cbc', Buffer.from(aesKey.key, 'hex'), Buffer.from(aesKey.iv, 'hex'));
            const bufEncrypted: Buffer = cipher.update(Buffer.from(data));
            const bufFinal: Buffer = cipher.final();
            let encrypted;

            // check if we have extra content
            /* istanbul ignore else */
            if (bufFinal) {
              encrypted = Buffer.concat([bufEncrypted, bufFinal]);
            } else {
              encrypted = bufEncrypted;
            }

            subscriber.next(encrypted);
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
