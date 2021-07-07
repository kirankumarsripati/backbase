// eslint-disable-next-line @typescript-eslint/no-var-requires
const transactions = require('../../assets/transactions.json');
import { FilterByPipe } from './filter-by.pipe';

describe('FilterByPipe', () => {
  let pipe: FilterByPipe;

  beforeEach(() => {
    pipe = new FilterByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should get nested value', () => {
    const object = {
      dates: {
        valueDate: 1600300800000,
      },
      transaction: {
        amountCurrency: {
          amount: '84.76',
          currencyCode: 'EUR',
        },
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
      },
    };

    const value1 = pipe.getDeepValue(object, ['dates', 'valueDate']);
    expect(value1).toBe(1600300800000);

    const value2 = pipe.getDeepValue(object, [
      'transaction',
      'amountCurrency',
      'currencyCode',
    ]);
    expect(value2).toBe('EUR');

    const value3 = pipe.getDeepValue(object, ['transaction', 'type']);
    expect(value3).toBe('Card Payment');
  });

  it('should return undefined for non keys', () => {
    expect(pipe.getDeepValue({}, ['somekey'])).toBe(undefined);
  });

  it('should filter data', () => {
    const totalItems = transactions.length;
    let filtered = pipe.transform(transactions, 'merchant.name', 'back');
    expect(filtered.length).toBe(1);
    // should not modify the transactions
    expect(transactions.length).toBe(totalItems);

    filtered = pipe.transform(transactions, 'merchant.name', '  te  ');
    expect(filtered.length).toBe(2);

    // if non existing property given, should return 0 results
    filtered = pipe.transform(transactions, 'merchant.notThere', 'back');
    expect(filtered.length).toBe(0);

    // if filter value is not passed, should return all
    filtered = pipe.transform(transactions, 'merchant.name');
    expect(filtered.length).toBe(totalItems);

    // single key instead of nested
    filtered = pipe.transform(transactions, 'categoryCode', '12a580');
    expect(filtered.length).toBe(4);
  });
});
