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

export const ITEMS_PER_SHOW = 12 as const;
export type ItemsPerShow = typeof ITEMS_PER_SHOW;

export const PRICE_BOUNDS = [120_000, 1_500_000] as const;
export type PriceBounds = typeof PRICE_BOUNDS;

export const YEAR_BOUNDS = [1960, 2025] as const;
export type YearBounds = typeof YEAR_BOUNDS;

export const ViewCard = ["List", "Kanban"] as const;
export type ViewCard = (typeof ViewCard)[number];
