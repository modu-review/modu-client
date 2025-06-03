const REGEX = {
  HANGUL_JAMO: /^[ㄱ-ㅎㅏ-ㅣ]+$/,
  SPECIAL_CHARS_ONLY: /^[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]+$/,
  ONLY_NUMBERS: /^\d+$/,
  SPECIAL_AND_NUMBERS_ONLY: /^[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?0-9]+$/,
} as const;

export default REGEX;
