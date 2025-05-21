const NEGATIVE = "ঋণাত্মক";
const DECIMAL = " দশমিক";

const HUNDRED = 100;
const THOUSAND = 1000;
const LAC = 100000;
const CORE = 10000000;
const BILLION = 1000000000;
const TRILLION = 1000000000000;
const QUADRILLION = 1000000000000000;
const MAX_SAFE_NUMBER = Number.MAX_SAFE_INTEGER;

const banglaNumberMap: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
  ".": ".",
  "-": "-",
  "+": "+",
  _: "_",
  "/": "/",
};

const banglaWordMap: Record<number, string> = {
  0: "শূন্য",
  1: "এক",
  2: "দুই",
  3: "তিন",
  4: "চার",
  5: "পাঁচ",
  6: "ছয়",
  7: "সাত",
  8: "আট",
  9: "নয়",
  10: "দশ",
  11: "এগারো",
  12: "বারো",
  13: "তেরো",
  14: "চৌদ্দ",
  15: "পনের",
  16: "ষোল",
  17: "সতের",
  18: "আঠার",
  19: "উনিশ",
  20: "বিশ",
  21: "একুশ",
  22: "বাইশ",
  23: "তেইশ",
  24: "চব্বিশ",
  25: "পঁচিশ",
  26: "ছাব্বিশ",
  27: "সাতাশ",
  28: "আটাশ",
  29: "ঊনত্রিশ",
  30: "ত্রিশ",
  31: "একত্রিশ",
  32: "বত্রিশ",
  33: "তেত্রিশ",
  34: "চৌত্রিশ",
  35: "পঁয়ত্রিশ",
  36: "ছত্রিশ",
  37: "সাঁইত্রিশ",
  38: "আটত্রিশ",
  39: "ঊনচল্লিশ",
  40: "চল্লিশ",
  41: "একচল্লিশ",
  42: "বিয়াল্লিশ",
  43: "তেতাল্লিশ",
  44: "চুয়াল্লিশ",
  45: "পঁয়তাল্লিশ",
  46: "ছিচল্লিশ",
  47: "সাতচল্লিশ",
  48: "আটচল্লিশ",
  49: "ঊনপঞ্চাশ",
  50: "পঞ্চাশ",
  51: "একান্ন",
  52: "বাহান্ন",
  53: "তেপ্পান্ন",
  54: "চুয়ান্ন",
  55: "পঞ্চান্ন",
  56: "ছাপ্পান্ন",
  57: "সাতান্ন",
  58: "আটান্ন",
  59: "ঊনষাট",
  60: "ষাট",
  61: "একষট্টি",
  62: "বাষট্টি",
  63: "তেষট্টি",
  64: "চৌষট্টি",
  65: "পঁয়ষট্টি",
  66: "ছেষট্টি",
  67: "সাতষট্টি",
  68: "আটষট্টি",
  69: "উনসত্তুর",
  70: "সত্তর",
  71: "একাত্তর",
  72: "বাহাত্তর",
  73: "তেহাত্তুর",
  74: "চুয়াত্তর",
  75: "পঁচাত্তর",
  76: "ছিয়াত্তর",
  77: "সাতাত্তর",
  78: "আটাত্তর",
  79: "ঊনআশি",
  80: "আশি",
  81: "একাশি",
  82: "বিরাশি",
  83: "তিরাশি",
  84: "চুরাশি",
  85: "পঁচাশি",
  86: "ছিয়াশি",
  87: "সাতাশি",
  88: "আটাশি",
  89: "উননব্বই",
  90: "নব্বই",
  91: "একানব্বই",
  92: "বিরানব্বই",
  93: "তিরানব্বই",
  94: "চুরানব্বই",
  95: "পঁচানব্বই",
  96: "ছিয়ানব্বই",
  97: "সাতানব্বই",
  98: "আটানব্বই",
  99: "নিরানব্বই",
  100: "শত",
  1000: "হাজার",
  100000: "লক্ষ",
  10000000: "কোটি",
  1000000000: "বিলিয়ন",
  1000000000000: "ট্রিলিয়ন",
  1000000000000000: "কোয়াড্রিলিয়ন",
};

const banglaDateMap: Record<string, string> = {
  am: "এ.এম.",
  pm: "পি.এম.",
  monday: "সোমবার",
  tuesday: "মঙ্গলবার",
  wednesday: "বুধবার",
  thursday: "বৃহস্পতিবার",
  friday: "শুক্রবার",
  saturday: "শনিবার",
  sunday: "রবিবার",
  january: "জানুয়ারি",
  february: "ফেব্রুয়ারি",
  march: "মার্চ",
  april: "এপ্রিল",
  may: "মে",
  june: "জুন",
  july: "জুলাই",
  august: "আগস্ট",
  september: "সেপ্টেম্বর",
  october: "অক্টোবর",
  november: "নভেম্বর",
  december: "ডিসেম্বর",
};

export const isNumber = (str: unknown): boolean => {
  const strTrim = str?.toString()?.trim();
  return strTrim !== "" && !isNaN(Number(strTrim));
};

export const englishToBanglaWord = (
  number: number | string,
  words: string[] = [],
): string => {
  if (typeof number === "string") number = Number(number);
  if (!isFinite(number) || isNaN(number)) return "সঠিক সংখ্যা নয়";

  if (number === 0) {
    return words.length === 0 ? banglaWordMap[0] : words.join(" ");
  }

  if (number < 0) {
    words.push(NEGATIVE);
    number = Math.abs(number);
  }

  if (number < HUNDRED) {
    words.push(banglaWordMap[number] ?? "");
  } else if (number < THOUSAND) {
    const remainder = number % HUNDRED;
    const quotient = Math.floor(number / HUNDRED);
    words.push(`${banglaWordMap[quotient]} ${banglaWordMap[HUNDRED]}`);
    if (remainder > 0) englishToBanglaWord(remainder, words);
  } else if (number < LAC) {
    const remainder = number % THOUSAND;
    const quotient = Math.floor(number / THOUSAND);
    words.push(`${banglaWordMap[quotient]} ${banglaWordMap[THOUSAND]}`);
    if (remainder > 0) englishToBanglaWord(remainder, words);
  } else if (number < CORE) {
    const remainder = number % LAC;
    const quotient = Math.floor(number / LAC);
    words.push(`${banglaWordMap[quotient]} ${banglaWordMap[LAC]}`);
    if (remainder > 0) englishToBanglaWord(remainder, words);
  } else if (number < BILLION) {
    const remainder = number % CORE;
    const quotient = Math.floor(number / CORE);
    words.push(`${englishToBanglaWord(quotient)} ${banglaWordMap[CORE]}`);
    if (remainder > 0) englishToBanglaWord(remainder, words);
  } else if (number < TRILLION) {
    const remainder = number % BILLION;
    const quotient = Math.floor(number / BILLION);
    words.push(`${englishToBanglaWord(quotient)} ${banglaWordMap[BILLION]}`);
    if (remainder > 0) englishToBanglaWord(remainder, words);
  } else if (number < QUADRILLION) {
    const remainder = number % TRILLION;
    const quotient = Math.floor(number / TRILLION);
    words.push(`${englishToBanglaWord(quotient)} ${banglaWordMap[TRILLION]}`);
    if (remainder > 0) englishToBanglaWord(remainder, words);
  } else if (number <= MAX_SAFE_NUMBER) {
    const remainder = number % QUADRILLION;
    const quotient = Math.floor(number / QUADRILLION);
    words.push(
      `${englishToBanglaWord(quotient)} ${banglaWordMap[QUADRILLION]}`,
    );
    if (remainder > 0) englishToBanglaWord(remainder, words);
  }

  return words.join(" ");
};

export const englishToBanglaNumber = (number: string | number): string => {
  if (!isNumber(number)) return "সঠিক সংখ্যা নয়";
  return number
    .toString()
    .split("")
    .map((char) => banglaNumberMap[char] ?? char)
    .join("");
};

export const singleNumberToWord = (number: number | string): string => {
  return number
    .toString()
    .split("")
    .map((char) => banglaWordMap[Number(char)] ?? char)
    .join(" ");
};

export const englishToBanglaDate = (input: string): string => {
  const trimmed = input.trim().toLowerCase();
  const regExp = /[a-z]/;
  let result = "";
  let buffer = "";

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (regExp.test(char)) {
      buffer += char;
    } else {
      if (buffer) {
        result += banglaDateMap[buffer] ?? buffer;
        buffer = "";
      }
      result += banglaNumberMap[char] ?? char;
    }
  }

  if (buffer) {
    result += banglaDateMap[buffer] ?? buffer;
  }

  return result || "Invalid Date or Time";
};

type ToBanglaReturn = {
  engToNumber: (number: number | string) => string;
  engToWord: (number: number | string, currency?: boolean) => string;
  engToDate: (date: string) => string;
};

export const toBangla = (): ToBanglaReturn => {
  return {
    engToNumber: (number: number | string): string => {
      return englishToBanglaNumber(number);
    },

    engToWord: (number: number | string, currency: boolean = false): string => {
      if (!isNumber(Number(number))) {
        return "Not a valid number";
      }

      const numberStr = number.toString().trim();

      if (numberStr.includes(".")) {
        const [intPart, fracPart] = numberStr.split(".");
        const firstPart = englishToBanglaWord(intPart);
        const lastPart = currency
          ? englishToBanglaWord(fracPart.slice(0, 2))
          : singleNumberToWord(fracPart);
        return currency
          ? `${firstPart} টাকা এবং ${lastPart} পয়সা`
          : `${firstPart}${DECIMAL} ${lastPart}`;
      }

      return currency
        ? `${englishToBanglaWord(numberStr)} টাকা`
        : englishToBanglaWord(numberStr);
    },

    engToDate: (date: string): string => {
      return englishToBanglaDate(date);
    },
  };
};

export const bn = toBangla();
