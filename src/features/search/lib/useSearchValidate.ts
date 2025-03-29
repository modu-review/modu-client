import REGEX from './regex';
import toast from '@/shared/lib/utils/toastService';
import {ERROR_MESSAGE} from '@/shared/lib/consts/errorMessage';

function useSearchValidate() {
  const getInvalidType = (query: string) => {
    if (!query) return ERROR_MESSAGE.INPUT_EMPTY;
    if (query.length < 2) return ERROR_MESSAGE.INPUT_TOO_SHORT;
    if (query.length > 20) return ERROR_MESSAGE.INPUT_TOO_LONG;
    if (REGEX.ONLY_NUMBERS.test(query)) return ERROR_MESSAGE.INPUT_ONLY_NUMBERS;
    if (REGEX.HANGUL_JAMO.test(query)) return ERROR_MESSAGE.INPUT_HANGUL_JAMO;
    if (REGEX.SPECIAL_CHARS_ONLY.test(query)) return ERROR_MESSAGE.INPUT_SPECIAL_CHARS_ONLY;
    if (REGEX.SPECIAL_AND_NUMBERS_ONLY.test(query)) return ERROR_MESSAGE.INPUT_SPECIAL_AND_NUMBERS_ONLY;
  };

  const validateSearchQuery = (query: string): boolean => {
    const invalidType = getInvalidType(query);

    if (invalidType) {
      toast.error({title: invalidType});
      return false;
    }

    return true;
  };

  return {validateSearchQuery};
}

export default useSearchValidate;
