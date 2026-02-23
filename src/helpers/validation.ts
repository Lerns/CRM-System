import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from './constants';
import type { RuleObject } from 'antd/es/form';

const trim = (value: string) => value.trim();

export const titleRules = [
  {
    required: true,
    message: 'Это поле не может быть пустым',
    transform: trim,
  },
  {
    min: MIN_TITLE_LENGTH,
    message: `Минимальная длина: ${MIN_TITLE_LENGTH}`,
  },
  {
    max: MAX_TITLE_LENGTH,
    message: `Максимальная длина: ${MAX_TITLE_LENGTH}`,
  },
];

export const usernameRules = [
  { required: true, message: 'Введите имя', transform: trim },

  {
    min: MIN_USERNAME_LENGTH,
    message: `Минимум ${MIN_USERNAME_LENGTH} символа`,
  },
  {
    max: MAX_USERNAME_LENGTH,
    message: `Максимум ${MAX_USERNAME_LENGTH} символов`,
  },
  {
    pattern: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
    message: 'Русский/латинский алфавит',
  },
];

export const loginRules = [
  { required: true, message: 'Введите логин', transform: trim },
  {
    pattern: /^[a-zA-Z0-9]+$/,
    message: 'Только латинские буквы и цифры',
  },
];

export const passwordRules = [
  { required: true, message: 'Введите пароль' },
  {
    min: MIN_PASSWORD_LENGTH,
    message: `Минимальная длина ${MIN_PASSWORD_LENGTH}`,
  },
  {
    max: MAX_PASSWORD_LENGTH,
    message: `Максимальная длина ${MAX_PASSWORD_LENGTH}`,
  },
];

export const emailRules: RuleObject[] = [
  { required: true, message: 'Введите email', transform: trim },
  { type: 'email', message: 'Некорректный email' },
];
export const phoneRules = [
  {
    pattern: /^\+?[0-9\s()-]+$/,
    message: 'Введите валидный номер',
  },
];
