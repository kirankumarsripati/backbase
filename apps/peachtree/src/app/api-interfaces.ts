export interface Transaction {
  categoryCode: string;
  dates: {
    valueDate: number | string;
  };
  transaction: {
    amountCurrency: {
      amount: string | number;
      currencyCode: string;
    };
    type: string;
    creditDebitIndicator: 'CRDT' | 'DBIT';
  };
  merchant: {
    name: string;
    accountNumber: string;
  };
}

export interface Transfer {
  toAccount: string;
  amount: number;
}
