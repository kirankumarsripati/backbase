import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Transfer, Transaction } from './api-interfaces';
import { BankFacade } from './services/bank.facade';
import { ReviewTransferComponent } from './components/review-transfer/review-transfer.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';

@Component({
  selector: 'bb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  transactions$: Observable<Transaction[]> = this.bankFacade.transactions$;
  balance$: Observable<number> = this.bankFacade.balance$;
  bsModalRef!: BsModalRef;
  modelSub!: Subscription;
  transactionSub!: Subscription;
  @ViewChild('makeTransfer')
  makeTransferComp!: MakeTransferComponent;

  constructor(
    public bankFacade: BankFacade,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.transactionSub = this.bankFacade.loadTransactions().subscribe();
  }

  confirmTransfer(transferData: Transfer) {
    const initialState = {
      transferData,
    };
    this.bsModalRef = this.modalService.show(ReviewTransferComponent, {
      initialState,
    });
    this.modelSub = this.bsModalRef.content.event.subscribe(
      (transferDetails: Transfer) => {
        this.bankFacade.sendAmountTo(transferDetails);
        this.makeTransferComp.reset();
      }
    );
  }

  ngOnDestroy() {
    if (this.modelSub) {
      this.modelSub.unsubscribe();
    }
    this.transactionSub.unsubscribe();
  }
}
