import Decimal from "decimal.js";
Decimal.set({ precision: 1e9 });
Decimal.set({ toExpPos: 9e15 });

const _convertFromDecimal = (num: string, base: string): string => {
  const convertedNumArr: string[] = [];

  let decimalNum = new Decimal(num);
  const decimalBase = new Decimal(base.length);
  while (!decimalNum.isZero()) {
    const remainder = decimalNum.mod(decimalBase).toNumber();
    decimalNum = decimalNum.dividedToIntegerBy(decimalBase);
    convertedNumArr.unshift(base.substring(remainder, remainder + 1));
  }

  if (convertedNumArr.length === 0) {
    convertedNumArr.unshift("0");
  }

  return convertedNumArr.join("");
};

const _convertToDecimal = (num: string, base: string): string => {
  const baseChar2Idx: { [key: string]: Decimal } = {};
  for (let i = 0; i < base.length; i++) {
    baseChar2Idx[base.substring(i, i + 1)] = new Decimal(i);
  }

  const decimalBase = new Decimal(base.length);
  let convertedNum = new Decimal(0);
  for (let i = 0; i < num.length; i++) {
    const tmpDecimal1 =
      baseChar2Idx[num.substring(num.length - i - 1, num.length - i)];
    const tmpDecimal2 = Decimal.pow(decimalBase, i);
    const tmpDecimal3 = tmpDecimal1.times(tmpDecimal2);
    convertedNum = convertedNum.plus(tmpDecimal3);
  }

  return convertedNum.toString();
};

/**
 * Convert num from originalBase to newBase.
 */
const convertBase = (
  num: number | string,
  originalBase: number | string,
  newBase: number | string
): string => {
  const BASE62 =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (
    (typeof num !== "number" && typeof num !== "string") ||
    (typeof num === "number" && !isFinite(num))
  ) {
    throw new Error("First augument must be a number or string.");
  }

  if (typeof num === "number") {
    num = num.toString();
  }

  if (typeof originalBase !== "number" && typeof originalBase !== "string") {
    throw new Error("Second augument must be a number or string.");
  }

  if (typeof originalBase === "number") {
    if (!Number.isInteger(originalBase)) {
      throw new Error("Second augument must be integer.");
    }
    if (!(2 <= originalBase && originalBase <= 62)) {
      throw new Error("Second augument must be between 2 and 62.");
    }
    originalBase = BASE62.substring(0, originalBase);
  }

  if (originalBase.length <= 1) {
    throw new Error(
      "Second augument' length must be larger than 1. Base 1 or smaller cannnot be defined."
    );
  }

  if (originalBase.length !== new Set(originalBase).size) {
    throw new Error("Second augument must not contain the same characters.");
  }

  if (num.length === 0) {
    throw new Error("First augument must consist of second augument.");
  }

  for (let i = 0; i < num.length; i++) {
    if (!originalBase.includes(num.charAt(i))) {
      throw new Error("First augument must consist of second augument.");
    }
  }

  if (typeof newBase !== "number" && typeof newBase !== "string") {
    throw new Error("Third augument must be a number or string.");
  }

  if (typeof newBase === "number") {
    if (!Number.isInteger(newBase)) {
      throw new Error("Third augument must be integer.");
    }
    if (!(2 <= newBase && newBase <= 62)) {
      throw new Error("Third augument must be between 2 and 62.");
    }
    newBase = BASE62.substring(0, newBase);
  }

  if (newBase.length <= 1) {
    throw new Error(
      "Third augument' length must be larger than 1. Base 1 or smaller cannnot be defined."
    );
  }

  if (newBase.length !== new Set(newBase).size) {
    throw new Error("Third augument must not contain the same characters.");
  }

  const tmpNum = _convertToDecimal(num, originalBase);
  return _convertFromDecimal(tmpNum, newBase);
};

const _10To2 = (num: number | string): string => {
  return convertBase(num, 10, 2);
};

const _10To8 = (num: number | string): string => {
  return convertBase(num, 10, 8);
};

const _10To16 = (num: number | string): string => {
  return convertBase(num, 10, 16);
};

const _10To32 = (num: number | string): string => {
  return convertBase(num, 10, 32);
};

const _10To36 = (num: number | string): string => {
  return convertBase(num, 10, 36);
};

const _10To62 = (num: number | string): string => {
  return convertBase(num, 10, 62);
};

const _2To10 = (num: number | string): string => {
  return convertBase(num, 2, 10);
};

const _8To10 = (num: number | string): string => {
  return convertBase(num, 8, 10);
};

const _16To10 = (num: number | string): string => {
  return convertBase(num, 16, 10);
};

const _32To10 = (num: number | string): string => {
  return convertBase(num, 32, 10);
};

const _36To10 = (num: number | string): string => {
  return convertBase(num, 36, 10);
};

const _62To10 = (num: number | string): string => {
  return convertBase(num, 62, 10);
};

export {
  convertBase,
  _10To2,
  _10To8,
  _10To16,
  _10To32,
  _10To36,
  _10To62,
  _2To10,
  _8To10,
  _16To10,
  _32To10,
  _36To10,
  _62To10,
};
