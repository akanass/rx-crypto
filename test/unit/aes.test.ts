import { Buffer } from 'buffer';
import { Observable, of, throwError } from 'rxjs';
import { AES } from '../../src';
import { decryptWithAesKey, encryptWithAesKey } from '../../src/operators/aes';

let aes: AES;
let password: string;
let salt: string;

describe('- Unit aes.test.ts file', () => {
  /**
   * Function executed before each test
   */
  beforeEach(() => {
    aes = new AES();
    password = 'P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl';
    salt = 'Kt9V3wgxrhpf8GN3';
  });

  /**
   * Function executed after each test
   */
  afterEach(() => {
    aes = undefined;
    password = undefined;
    salt = undefined;
  });

  /**
   * Test if `AES.createKey()` function returns an Observable
   */
  test('- `AES.createKey()` function must return an Observable', (done) => {
    expect(aes.createKey(null, null)).toBeInstanceOf(Observable);
    done();
  });

  /**
   * Test if `AES.createKey()` function returns an Observable with error if AES key parameters are wrong
   */
  test('- `AES.createKey()` function must return an Observable with error if AES key parameters are wrong', (done) => {
    const spy = jest.spyOn(aes['_hash'], 'generate');
    spy.mockImplementationOnce(() => throwError(() => new Error('Wrong AES key')));

    aes.createKey(null, null).subscribe({
      error: err => {
        expect(err.message).toBe('Wrong AES key');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
        done();
      }
    });
  });

  /**
   * Test if `AES.createKey().pipe(encryptWithAesKey())` function returns an Observable
   */
  test('- `AES.createKey().pipe(encryptWithAesKey())` function must return an Observable', (done) => {
    const spy = jest.spyOn(aes['_hash'], 'generate');
    spy.mockImplementationOnce(() =>
      of(Buffer.from('61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f441931cef43b785870e993cbc94aee0354cf', 'hex'))
    );

    expect(
      aes.createKey(password, salt)
        .pipe(
          encryptWithAesKey(null)
        )
    ).toBeInstanceOf(Observable);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    done();
  });

  /**
   * Test if `AES.createKey().pipe(decryptWithAesKey())` function returns an Observable
   */
  test('- `AES.createKey().pipe(decryptWithAesKey())` function must return an Observable', (done) => {
    const spy = jest.spyOn(aes['_hash'], 'generate');
    spy.mockImplementationOnce(() =>
      of(Buffer.from('61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f441931cef43b785870e993cbc94aee0354cf', 'hex'))
    );

    expect(
      aes.createKey(password, salt)
        .pipe(
          decryptWithAesKey(null)
        )
    ).toBeInstanceOf(Observable);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    done();
  });
});
