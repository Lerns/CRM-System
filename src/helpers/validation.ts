import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH } from './constants';

export const titleRules = [
  {
    required: true,
    message: 'Это поле не может быть пустым',
    transform: (value: string) => value.trim(),
  },
  {
    min: MIN_TITLE_LENGTH,
    message: `Минимум ${MIN_TITLE_LENGTH} символа`,
    transform: (value: string) => value.trim(),
  },
  {
    max: MAX_TITLE_LENGTH,
    message: `Максимум ${MAX_TITLE_LENGTH} символа`,
    transform: (value: string) => value.trim(),
  },
];
