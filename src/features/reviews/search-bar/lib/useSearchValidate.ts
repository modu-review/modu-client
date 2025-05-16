import {useState} from 'react';
import REGEX from './regex';
import {ERROR_MESSAGE} from '@/shared/lib/consts/errorMessage';

function useSearchValidate() {
  const [error, setError] = useState<string | null>(null);

  const getInvalidType = (query: string) => {
    if (!query) return ERROR_MESSAGE.INPUT_EMPTY;
    if (query.length < 2) return ERROR_MESSAGE.INPUT_TOO_SHORT;
    if (query.length > 20) return ERROR_MESSAGE.INPUT_TOO_LONG;
    if (REGEX.ONLY_NUMBERS.test(query)) return ERROR_MESSAGE.INPUT_ONLY_NUMBERS;
    if (REGEX.HANGUL_JAMO.test(query)) return ERROR_MESSAGE.INPUT_HANGUL_JAMO;
    if (REGEX.SPECIAL_CHARS_ONLY.test(query)) return ERROR_MESSAGE.INPUT_SPECIAL_CHARS_ONLY;
    if (REGEX.SPECIAL_AND_NUMBERS_ONLY.test(query)) return ERROR_MESSAGE.INPUT_SPECIAL_AND_NUMBERS_ONLY;
    return null;
  };

  const validateSearchQuery = (query: string): boolean => {
    const invalidType = getInvalidType(query);

    if (invalidType) {
      setError(invalidType);
      return false;
    }

    return true;
  };

  const clearError = () => setError(null);

  return {validateSearchQuery, error, clearError};
}

export default useSearchValidate;
