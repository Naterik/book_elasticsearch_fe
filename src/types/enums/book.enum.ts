export const BookCopyStatus = {
  AVAILABLE: "AVAILABLE",
  BORROWED: "BORROWED",
  RESERVED: "RESERVED",
  LOST: "LOST",
} as const;

export type BookCopyStatus =
  (typeof BookCopyStatus)[keyof typeof BookCopyStatus];

export const BookLanguage = {
  VIETNAMESE: "vi",
  ENGLISH: "en",
  FRENCH: "fr",
  JAPANESE: "ja",
  CHINESE: "zh",
} as const;

export type BookLanguage = (typeof BookLanguage)[keyof typeof BookLanguage];
