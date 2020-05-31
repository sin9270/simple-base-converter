# simple-base-converter

master: ![](https://github.com/sin9270/simple-base-converter/workflows/Node.js%20Package/badge.svg?branch=master)

Simple math module for base conversion.

## Install

```bash
npm i simple-base-converter
```

## Usage
Some bases(2, 8, 16, 32, 36, 62) are predefined.

- _10To2(num)
- _10To8(num)
- _10To16(num)
- _10To32(num)
- _10To36(num)
- _10To62(num)
- _2To10(num)
- _8To10(num)
- _16To10(num)
- _32To10(num)
- _36To10(num)
- _62To10(num)

```Javascript
import { _10To2, _2To10 } from "simple-base-converter";

_10To2(100); // "1100100"
_2To10(1100100); // "100"

// Input can be both integer or string number.
_10To2("100"); // "1100100"
_2To10("1100100"); // "100"
```

Of course you can choose bases freely.  
`convertBase(num, originalBase, newBase)` converts num from originalBase to newBase.  
If you set integer to originalBase or newBase, they are automatically converted by using default base `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`.

```Javascript
import { convertBase } from "simple-base-converter";

convertBase("20a4", 17, 52); // "3Ag"
convertBase("20a4", "0123456789abcdefg", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP"); // "3Ag"
```

Custom bases are also available.

```Javascript
convertBase(10000, 10, "－・"); // "・－－・・・－－－・－－－－"
convertBase("4649", "0123456789", "零一二三四五六七八九"); // "四六四九"
```
