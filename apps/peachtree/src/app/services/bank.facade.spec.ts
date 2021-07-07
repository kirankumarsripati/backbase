import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Transaction } from '../api-interfaces';

import { BankFacade } from './bank.facade';
import { BankService } from './bank.service';

describe('BankFacade', () => {
  let service: BankFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BankService, BankFacade],
    });
    service = TestBed.inject(BankFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate balance', () => {
    const transactions: Transaction[] = [
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600493600000,
        },
        transaction: {
          amountCurrency: {
            amount: 5000,
            currencyCode: 'EUR',
          },
          type: 'Salaries',
          creditDebitIndicator: 'CRDT',
        },
        merchant: {
          name: 'Backbase',
          accountNumber: 'SI64397745065188826',
        },
      },
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600387200000,
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: 'The Tea Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
    ];

    expect(service.calculateBalance(transactions)).toBe(4917.98);
  });

  it('should call sort transactions', (done) => {
    const spy = jest.spyOn(service, 'sortTransactions');
    service.loadTransactions().subscribe((value) => {
      expect(Array.isArray(value)).toBe(true);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
