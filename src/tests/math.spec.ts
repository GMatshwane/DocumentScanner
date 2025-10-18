import { add, clamp, average } from '@/lib/math';

describe('math utilities', () => {
  test('add adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('clamp enforces bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });

  test('clamp throws if min > max', () => {
    expect(() => clamp(1, 10, 0)).toThrow('min cannot be greater than max');
  });

  test('average handles lists', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5);
    expect(average([])).toBe(0);
  });
});
