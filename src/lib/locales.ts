export const LOCALES = ["en", "es", "fr", "zh", "ar", "hi", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export type LocalePreference = Locale | "auto";

export const LOCALE_NATIVE_NAME: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  zh: "简体中文",
  ar: "العربية",
  hi: "हिन्दी",
  pt: "Português",
};

export const LOCALE_ENGLISH_NAME: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  zh: "Simplified Chinese",
  ar: "Arabic",
  hi: "Hindi",
  pt: "Portuguese",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function isLocalePreference(value: unknown): value is LocalePreference {
  return value === "auto" || isLocale(value);
}

export function localeFromBrowser(language: string): Locale {
  const tag = language.toLowerCase();
  if (tag.startsWith("zh")) return "zh";
  if (tag.startsWith("es")) return "es";
  if (tag.startsWith("fr")) return "fr";
  if (tag.startsWith("ar")) return "ar";
  if (tag.startsWith("hi")) return "hi";
  if (tag.startsWith("pt")) return "pt";
  if (tag.startsWith("en")) return "en";
  return "en";
}

export function resolveLocale(preference: LocalePreference, browserLanguage?: string): Locale {
  if (preference !== "auto") return preference;
  return localeFromBrowser(browserLanguage || "en");
}
