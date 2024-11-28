import { formatTime } from './formatTime'; 

describe('formatTime function', () => {
  test('Проверяет, что функция корректно форматирует 65 секунд в 1:05', () => {
    expect(formatTime(65)).toBe('1:05');
  });

  test('Убеждается, что функция правильно форматирует время для значений меньше 60 секунд', () => {
    expect(formatTime(30)).toBe('0:30');
  });

  test('Проверяет корректность форматирования для значения 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });

});