export const languageOptions = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
  unknown: "Unknown",
};

export const getLanguageName = (code) => {
  return languageOptions[code] || code;
};
