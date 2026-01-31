import axios from 'axios';

export function errorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    switch (err.response?.status) {
      case 400:
        return 'Некорректные данные, проверьте и попробуйте снова';
      case 401:
        return 'Неверные учетные данные';
      case 404:
        return 'Ресурс не найден';
      case 409:
        return 'Пользователь с такими данными уже существует';
      case 500:
        return 'Внутренняя ошибка сервера';
      default:
        return `Произошла ошибка. Попробуйте позже.`;
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === 'string') {
    return err;
  }

  return 'Неизвестная ошибка';
}
