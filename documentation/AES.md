<div style="margin-bottom:20px;">
<div>
    <a href="https://www.typescriptlang.org/docs/tutorial.html">
        <img src="https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png"
             align="right" alt="Typescript logo" width="50" height="50" style="border:none;" />
    </a>
    <a href="http://reactivex.io/rxjs">
        <img src="http://reactivex.io/assets/Rx_Logo_S.png"
             align="right" alt="ReactiveX logo" width="50" height="50" style="border:none;" />
    </a>
</div>
</div>

# AES 

After created an instance of `AES` you can have access to all methods and operators.

```javascript
import { AES } from '@akanass/rx-crypto';

const aes: AES = new AES();
```

## Table of contents

* [API in Detail](#api-in-detail)
    * [.createKey(password, salt)](#createkeypassword-salt)
    * [.encryptWithAesKey(data)](#encryptwithaeskeydata)
    * [.decryptWithAesKey(data)](#decryptwithaeskeydata)
* [Change History](#change-history)

## API in Detail

### `.createKey(password, salt)`

Creates `RSA-SHA256` `AES key` for given `password` and `salt`

**Parameters:**
> - ***{string | Buffer} password*** *(required): password for `AES key`.*
> - ***{string | Buffer} salt*** *(required): salt for `AES key` should also be as unique as possible. It is recommended that the salts are random and their lengths are greater than 16 bytes.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully generated `AES key` will be passed as a `{key, iv}` object and used to encrypt and decrypt data.*

**Example:**
```javascript
aes.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3')
    .subscribe(
        (aesKeyCreationResult: AesKeyCreationResult) => console.log(aesKeyCreationResult), // Show `{key: '61cac683ff27580e4c68778df5208c745b0e4731727786586938c794a37f4419', iv: '31cef43b785870e993cbc94aee0354cf'}` in the console
        e => console.error(e.message) // Show error message in the console
    );
```
[Back to top](#table-of-contents)

### `.encryptWithAesKey(data)`

Encrypting `data` method with `AES key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Buffer} data*** *(required): data for encrypting.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `encrypted` data will be passed as a `Buffer`.*

**Example:**
```javascript
import { encryptWithAesKey } from '@akanass/rx-crypto/operators/aes';

...

aes.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3')
    .pipe(
        encryptWithAesKey(Buffer.from('data'))
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString('hex')), // Show `a3d4bb8fcb8ec0e24a86cef07a28e3af` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

### `.decryptWithAesKey(data)`

Decrypting `data` method with `AES key`. This method is an `Observable's` `operator`.

**Parameters:**
> - ***{Buffer} data*** *(required): data for decrypting.*

**Response:**
> *{[RxJS.Observable](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Observable.ts)} The successfully `decrypted` data will be passed as a `Buffer`.*

**Example:**
```javascript
import { decryptWithAesKey } from '@akanass/rx-crypto/operators/aes';

...

aes.createKey('P3HQdR35PUQLZ5ioOrsPlxx7QWra7WQl', 'Kt9V3wgxrhpf8GN3')
    .pipe(
        decryptWithAesKey(Buffer.from('a3d4bb8fcb8ec0e24a86cef07a28e3af', 'hex'))
    )
    .subscribe(
        (buffer: Buffer) => console.log(buffer.toString()), // Show `data` in the console
        e => console.error(e.message) // Show error message in the console
    );
```

[Back to top](#table-of-contents)

## Change History

* Implementation of all methods (2019-08-27)
    * [.createKey(password, salt)](#createkeypassword-salt)
    * [.encryptWithAesKey(data)](#encryptwithaeskeydata)
    * [.decryptWithAesKey(data)](#decryptwithaeskeydata)
    
[Back to top](#table-of-contents)

