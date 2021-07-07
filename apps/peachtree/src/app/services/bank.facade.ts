import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction, Transfer } from '../api-interfaces';
import { BankService } from './bank.service';

@Injectable()
export class BankFacade {
  private transactionsSubj: BehaviorSubject<Transaction[]> =
    new BehaviorSubject<Transaction[]>([]);
  private transactions: Transaction[] = [];
  private balanceSubj: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  transactions$ = this.transactionsSubj.asObservable();
  balance$ = this.balanceSubj.asObservable();

  constructor(private bankService: BankService) {
    this.transactionsSubj.subscribe((res) => this.calculateBalance(res));
  }

  loadTransactions() {
    return this.bankService
      .getTransactions()
      .pipe(
        map((transactions: Transaction[]) => {
          const sorted = transactions.sort((a, b) => {
            return (
              new Date(b.dates.valueDate).getTime() -
              new Date(a.dates.valueDate).getTime()
            );
          });
          this.transactionsSubj.next(sorted);
          this.transactions = transactions;
        })
      )
      .subscribe();
  }

  sendAmountTo(transactionDetails: Transfer) {
    this.transactions.unshift({
      categoryCode: '#d51271',
      dates: {
        valueDate: new Date().getTime(),
      },
      transaction: {
        amountCurrency: {
          amount: transactionDetails.amount,
          currencyCode: 'EUR',
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: transactionDetails.toAccount,
        accountNumber: transactionDetails.toAccount,
      },
    });
    this.transactionsSubj.next(this.transactions.slice());
  }

  calculateBalance(transactions: Transaction[]) {
    let balance = 0;
    transactions.forEach((item) => {
      if (item.transaction.creditDebitIndicator === 'DBIT') {
        balance -= +item.transaction.amountCurrency.amount;
      } else {
        balance += +item.transaction.amountCurrency.amount;
      }
    });
    this.balanceSubj.next(balance);
  }

  getAllowedMinBalance() {
    return -500;
  }
}
