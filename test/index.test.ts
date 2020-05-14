/* eslint @typescript-eslint/no-explicit-any: 0 */
import {
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
} from "../src/";

describe("test baseConverter", () => {
  it("test convertBase()", () => {
    // First augument must be a number or string.
    expect(() => {
      convertBase(null as any, 62, 62);
    }).toThrow(/First/);
    expect(() => {
      convertBase(undefined as any, 62, 62);
    }).toThrow(/First/);
    expect(() => {
      convertBase(true as any, 62, 62);
    }).toThrow(/First/);
    expect(() => {
      convertBase(100, 62, 62);
    }).not.toThrow();
    expect(() => {
      convertBase("100", 62, 62);
    }).not.toThrow();
    // NaN and Infinity have number type, but not allowed.
    expect(() => {
      convertBase(NaN, 62, 62);
    }).toThrow(/First/);
    expect(() => {
      convertBase(Infinity, 62, 62);
    }).toThrow(/First/);

    // Second augument must be a number or string.
    expect(() => {
      convertBase("100", null as any, 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", undefined as any, 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", true as any, 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", 10, 62);
    }).not.toThrow();
    expect(() => {
      convertBase("100", "1234567890", 62);
    }).not.toThrow();
    // NaN and Infinity have number type, but not allowed.
    expect(() => {
      convertBase("100", NaN, 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", Infinity, 62);
    }).toThrow(/Second/);

    // Second augument must be integer.
    expect(() => {
      convertBase("100", 10.1, 62);
    }).toThrow(/Second/);

    // Second augument must be between 2 and 62.
    expect(() => {
      convertBase("100", 1, 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", 63, 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", 2, 62);
    }).not.toThrow();
    expect(() => {
      convertBase("100", 62, 62);
    }).not.toThrow();

    // Second augument' length must be larger than 1.
    expect(() => {
      convertBase("100", "", 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", "0", 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", "01", 62);
    }).not.toThrow();

    // Second augument must not contain the same characters.
    expect(() => {
      convertBase("100", "1234567899", 62);
    }).toThrow(/Second/);
    expect(() => {
      convertBase("100", "1234567890", 62);
    }).not.toThrow();

    // First augument must consist of second augument.
    expect(() => {
      convertBase("", 62, 62);
    }).toThrow(/First.*Second/i);
    expect(() => {
      convertBase("test", 16, 62);
    }).toThrow(/First.*Second/i);
    expect(() => {
      convertBase("test!", 62, 62);
    }).toThrow(/First.*Second/i);
    expect(() => {
      convertBase(
        "test!",
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!",
        62
      );
    }).not.toThrow();

    // Third augument must be a number or string.
    expect(() => {
      convertBase("100", 62, null as any);
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, undefined as any);
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, true as any);
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, 10);
    }).not.toThrow();
    expect(() => {
      convertBase("100", 62, "1234567890");
    }).not.toThrow();
    // NaN and Infinity have number type, but not allowed.
    expect(() => {
      convertBase("100", 62, NaN as any);
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, Infinity as any);
    }).toThrow(/Third/);

    // Third augument must be integer.
    expect(() => {
      convertBase("100", 62, 10.1);
    }).toThrow(/Third/);

    // Third augument must be between 2 and 62.
    expect(() => {
      convertBase("100", 62, 1);
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, 63);
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, 2);
    }).not.toThrow();
    expect(() => {
      convertBase("100", 62, 62);
    }).not.toThrow();

    // Third augument' length must be larger than 1.
    expect(() => {
      convertBase("100", 62, "");
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, "0");
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, "01");
    }).not.toThrow();

    // Third augument must not contain the same characters.
    expect(() => {
      convertBase("100", 62, "1234567899");
    }).toThrow(/Third/);
    expect(() => {
      convertBase("100", 62, "1234567890");
    }).not.toThrow();

    // Chech if the method returns a correct value.
    expect(convertBase("100", 10, 2)).toBe("1100100");
    expect(convertBase("100", 10, 8)).toBe("144");
    expect(convertBase("100", 10, 10)).toBe("100");
    expect(convertBase("100", 10, 16)).toBe("64");
    expect(convertBase("100", 10, 32)).toBe("34");
    expect(convertBase("100", 10, 36)).toBe("2s");
    expect(convertBase("100", 10, 62)).toBe("1C");
    expect(convertBase("1234567890", 10, "零一二三四五六七八九")).toBe(
      "一二三四五六七八九零"
    );
  });

  it("test _10To2()", () => {
    expect(_10To2(100)).toBe("1100100");
    expect(_10To2("100")).toBe("1100100");
  });

  it("test _10To8()", () => {
    expect(_10To8(100)).toBe("144");
    expect(_10To8("100")).toBe("144");
  });

  it("test _10To16()", () => {
    expect(_10To16(100)).toBe("64");
    expect(_10To16("100")).toBe("64");
  });

  it("test _10To2()", () => {
    expect(_10To32(100)).toBe("34");
    expect(_10To32("100")).toBe("34");
  });

  it("test _10To2()", () => {
    expect(_10To36(100)).toBe("2s");
    expect(_10To36("100")).toBe("2s");
  });

  it("test _10To2()", () => {
    expect(_10To62(100)).toBe("1C");
    expect(_10To62("100")).toBe("1C");
  });

  it("test _2To10()", () => {
    expect(_2To10(100)).toBe("4");
    expect(_2To10("100")).toBe("4");
  });

  it("test _8To10()", () => {
    expect(_8To10(100)).toBe("64");
    expect(_8To10("100")).toBe("64");
  });

  it("test _16To10()", () => {
    expect(_16To10(100)).toBe("256");
    expect(_16To10("100")).toBe("256");
  });

  it("test _32To10()", () => {
    expect(_32To10(100)).toBe("1024");
    expect(_32To10("100")).toBe("1024");
  });

  it("test _36To10()", () => {
    expect(_36To10(100)).toBe("1296");
    expect(_36To10("100")).toBe("1296");
  });

  it("test _62To10()", () => {
    expect(_62To10(100)).toBe("3844");
    expect(_62To10("100")).toBe("3844");
  });
});
