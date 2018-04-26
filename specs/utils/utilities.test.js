import {formatInteger, formatMoney} from '../../src/utils';

const integerTest = new RegExp(/^(?:\d{1,3},)?(?:\d{3},)*\d{1,3}$/);
const decimalTest = new RegExp(/^(?:\d{1,3},)?(?:\d{3},)*\d{1,3}.(?:\d*)$/);

describe('Utility functions', () => {
  describe('formatInteger()', () => {
    it('should return a string', () => {
      expect(formatInteger(0)).toEqual(expect.any(String));
    });

    it('should format the number with commas where appropriate, excluding decimal values', () => {
      const testInput = [
        1,
        10,
        100,
        1000,
        10000,
        100000,
        1000000,
        10000000,
        100000000,
        1000000000,
        10000000000,
        100000000000,
      ];
      testInput.forEach(t =>
        expect(formatInteger(t)).toEqual(expect.stringMatching(integerTest)),
      );
    });
  });

  describe('formatMoney()', () => {
    it('should return a string', () => {
      expect(formatMoney(0)).toEqual(expect.any(String));
    });

    it('should format the number with commas where appropriate, including decimal values', () => {
      const testInput = [
        1,
        45,
        97,
        173,
        499.9871,
        2066,
        8170,
        344401.1876,
        5978086198870134.9817,
        9817018743509878,
        155422014880.80475,
      ];
      testInput.forEach(t =>
        expect(formatMoney(t)).toEqual(expect.stringMatching(decimalTest)),
      );
    });
  });
});
