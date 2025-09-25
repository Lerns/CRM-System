export function validateTodoTitle(value: string) {
  if (!value.trim()) {
    return 'Это поле не может быть пустым';
  }
  if (value.trim().length < 2) {
    return 'Минимальная длина текста 2 символа';
  }
  if (value.length > 64) {
    return 'Максимальная длина текста 64 символа';
  }
  return '';
}
