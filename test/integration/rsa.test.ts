import { Buffer } from 'buffer';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { NodeRSA, RSA } from '../../src';
import {
  decryptPrivate,
  decryptPublic,
  encryptPrivate,
  encryptPublic,
  exportKey,
  generateKeyPair,
  getKeySize,
  getMaxMessageSize,
  importKey,
  isEmptyKey,
  isPrivate,
  isPublic,
  sign,
  verify
} from '../../src/operators/rsa';

let rsa: RSA;
let testKey: string;

describe('- Unit rsa.service.test.ts file', () => {
  /**
   * Function executed before each test
   */
  beforeEach(() => {
    rsa = new RSA();
    testKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n' +
      'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n' +
      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n' +
      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n' +
      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n' +
      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n' +
      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n' +
      '-----END RSA PRIVATE KEY-----';
  });

  /**
   * Function executed after each test
   */
  afterEach(() => {
    rsa = undefined;
    testKey = undefined;
  });

  /**
   * Test if `RSA.createKey()` Observable must return NodeRSA instance
   */
  test('- `RSA.createKey()` Observable must return NodeRSA instance', (done) => {
    rsa.createKey().subscribe(nodeRSA => {
      expect(nodeRSA).toBeInstanceOf(NodeRSA);
      done();
    });
  });

  /**
   * Test if `RSA.createKey()` function returns an Observable with error if key size is wrong
   */
  test('- `RSA.createKey()` function must return an Observable with error if key size is wrong', (done) => {
    rsa.createKey({ b: 7 }).subscribe({
      error: err => {
        expect(err.message).toBe('Key size must be a multiple of 8.');
        done();
      }
    });
  });

  /**
   * Test if `RSA.loadKey()` Observable must return NodeRSA instance
   */
  test('- `RSA.loadKey()` Observable must return NodeRSA instance', (done) => {
    rsa.loadKey(testKey).subscribe(nodeRSA => {
      expect(nodeRSA).toBeInstanceOf(NodeRSA);
      done();
    });
  });

  /**
   * Test if `RSA.loadKey()` function returns an Observable with error if key is wrong
   */
  test('- `RSA.loadKey()` function must return an Observable with error if key is wrong', (done) => {
    rsa.loadKey('').subscribe({
      error: err => {
        expect(err.message).toBe('Empty key given');
        done();
      }
    });
  });

  /**
   * Test if `RSA.createKey().pipe(importKey())` Observable must return NodeRSA instance
   */
  test('- `RSA.createKey().pipe(importKey())` Observable must return NodeRSA instance', (done) => {
    rsa.createKey()
      .pipe(
        importKey(testKey)
      )
      .subscribe(nodeRSA => {
        expect(nodeRSA).toBeInstanceOf(NodeRSA);
        done();
      });
  });

  /**
   * Test if `RSA.createKey().pipe(importKey())` returns an error if bad instance of NodeRSA
   */
  test('- `RSA.createKey().pipe(importKey())` must return an error if bad instance of NodeRSA', (done) => {
    of({})
      .pipe(
        importKey(testKey)
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.importKey is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.createKey().pipe(generateKeyPair())` Observable must return NodeRSA instance
   */
  test('- `RSA.createKey().pipe(generateKeyPair())` Observable must return NodeRSA instance', (done) => {
    rsa.createKey()
      .pipe(
        generateKeyPair()
      )
      .subscribe(nodeRSA => {
        expect(nodeRSA).toBeInstanceOf(NodeRSA);
        done();
      });
  });

  /**
   * Test if `RSA.createKey().pipe(generateKeyPair())` returns an error if bad instance of NodeRSA
   */
  test('- `RSA.createKey().pipe(generateKeyPair())` must return an error if bad instance of NodeRSA', (done) => {
    of({})
      .pipe(
        generateKeyPair()
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.generateKeyPair is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(exportKey())` returns same key
   */
  test('- `RSA.loadKey().pipe(exportKey())` must return same key', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        exportKey()
      )
      .subscribe(k => {
        expect(k).toStrictEqual(testKey);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(exportKey())` returns an error if export format is wrong
   */
  test('- `RSA.loadKey().pipe(exportKey())` must return an error if export format is wrong', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        exportKey(<any>'badFormat')
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('Unsupported key format');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(isPrivate())` returns true
   */
  test('- `RSA.loadKey().pipe(isPrivate())` must return true', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        isPrivate()
      )
      .subscribe(isPrivate => {
        expect(isPrivate).toBeTruthy();
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(isPrivate())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(isPrivate())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        isPrivate()
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.isPrivate is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(isPublic())` returns false
   */
  test('- `RSA.loadKey().pipe(isPublic())` must return false', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        isPublic(true)
      )
      .subscribe(isPublic => {
        expect(isPublic).toBeFalsy();
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(isPublic())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(isPublic())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        isPublic()
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.isPublic is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(isEmptyKey())` returns false
   */
  test('- `RSA.loadKey().pipe(isEmptyKey())` must return false', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        isEmptyKey()
      )
      .subscribe(isEmptyKey => {
        expect(isEmptyKey).toBeFalsy();
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(isEmptyKey())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(isEmptyKey())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        isEmptyKey()
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.isEmpty is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(getKeySize())` returns key size
   */
  test('- `RSA.loadKey().pipe(getKeySize())` must return key size', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        getKeySize()
      )
      .subscribe(size => {
        expect(size).toStrictEqual(511);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(getKeySize())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(getKeySize())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        getKeySize()
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.getKeySize is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(getMaxMessageSize())` returns  max message size
   */
  test('- `RSA.loadKey().pipe(getMaxMessageSize())` must return  max message size', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        getMaxMessageSize()
      )
      .subscribe(size => {
        expect(size).toStrictEqual(22);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(getMaxMessageSize())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(getMaxMessageSize())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        getMaxMessageSize()
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.getMaxMessageSize is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(encryptPublic())` returns a Buffer
   */
  test('- `RSA.loadKey().pipe(encryptPublic())` must return a Buffer', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        encryptPublic('data')
      )
      .subscribe(data => {
        expect(data).toBeInstanceOf(Buffer);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(encryptPublic())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(encryptPublic())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        encryptPublic('data')
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.encrypt is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(encryptPrivate())` returns a Buffer
   */
  test('- `RSA.loadKey().pipe(encryptPrivate())` must return a Buffer', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        encryptPrivate('data')
      )
      .subscribe(data => {
        expect(data).toBeInstanceOf(Buffer);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(encryptPrivate())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(encryptPrivate())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        encryptPrivate('data')
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.encryptPrivate is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(decryptPublic())` returns same value than before encryptPrivate()
   */
  test('- `RSA.loadKey().pipe(decryptPublic())` must return same value than before encryptPrivate()', (done) => {
    of(
      rsa.loadKey(testKey)
    )
      .pipe(
        mergeMap((key: Observable<NodeRSA>) =>
          key
            .pipe(
              encryptPrivate('data'),
              mergeMap((enc: Buffer) =>
                key
                  .pipe(
                    decryptPublic(enc)
                  )
              )
            )
        )
      )
      .subscribe(data => {
        expect(data).toBeInstanceOf(Buffer);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(decryptPublic())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(decryptPublic())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        decryptPublic('data')
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.decryptPublic is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(decryptPrivate())` returns same value than before encryptPublic()
   */
  test('- `RSA.loadKey().pipe(decryptPrivate())` must return same value than before encryptPublic()', (done) => {
    of(
      rsa.loadKey(testKey)
    )
      .pipe(
        mergeMap((key: Observable<NodeRSA>) =>
          key
            .pipe(
              encryptPublic('data'),
              mergeMap((enc: Buffer) =>
                key
                  .pipe(
                    decryptPrivate(enc, 'utf8')
                  )
              )
            )
        )
      )
      .subscribe(data => {
        expect(data).toStrictEqual('data');
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(decryptPrivate())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(decryptPrivate())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        decryptPrivate('data')
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.decrypt is not a function');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(sign())` returns a Buffer
   */
  test('- `RSA.loadKey().pipe(sign())` must return a Buffer', (done) => {
    rsa.loadKey(testKey)
      .pipe(
        sign('data')
      )
      .subscribe(data => {
        expect(data).toBeInstanceOf(Buffer);
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(sign())` returns an error if no private key provided
   */
  test('- `RSA.loadKey().sign()` lettable operator must return an error if no private key provided', (done) => {
    of(rsa.loadKey(testKey))
      .pipe(
        mergeMap((key: Observable<NodeRSA>) =>
          key
            .pipe(
              exportKey('public'),
              mergeMap((k: any) =>
                rsa.loadKey(k)
                  .pipe(
                    sign('data')
                  )
              )
            )
        )
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('This is not private key');
          done();
        }
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(verify())` returns true
   */
  test('- `RSA.loadKey().verify()` must return a true', (done) => {
    of(rsa.loadKey(testKey))
      .pipe(
        mergeMap((key: Observable<NodeRSA>) =>
          key
            .pipe(
              sign('data'),
              mergeMap((signature: Buffer) =>
                key
                  .pipe(
                    verify('data', signature)
                  )
              )
            )
        )
      )
      .subscribe(isVerified => {
        expect(isVerified).toBeTruthy();
        done();
      });
  });

  /**
   * Test if `RSA.loadKey().pipe(verify())` returns an error if no key provided
   */
  test('- `RSA.loadKey().pipe(verify())` must return an error if no key provided', (done) => {
    of({})
      .pipe(
        verify('data', '')
      )
      .subscribe({
        error: err => {
          expect(err.message).toBe('nodeRSA.verify is not a function');
          done();
        }
      });
  });
});
