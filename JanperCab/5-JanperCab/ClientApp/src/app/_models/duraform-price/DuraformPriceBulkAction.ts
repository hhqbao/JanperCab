export class DuraformPriceBulkAction {
  operator: string;
  value: number;
  unit: string;

  calculate = (baseValue: number) => {
    const math = {
      '+$': (x: number, y: number) => {
        return x + y;
      },
      '-$': (x: number, y: number) => {
        return x - y;
      },
      '+%': (x: number, y: number) => {
        const value = (y * x) / 100;
        return x + value;
      },
      '-%': (x: number, y: number) => {
        const value = (y * x) / 100;
        return x - value;
      },
    };

    return math[`${this.operator}${this.unit}`](baseValue, this.value);
  };
}
