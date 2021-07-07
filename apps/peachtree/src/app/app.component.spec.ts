import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BbUIModule } from '@bb/bb-ui';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Transfer } from './api-interfaces';
import { AppComponent } from './app.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { ReviewTransferComponent } from './components/review-transfer/review-transfer.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { BankFacade } from './services/bank.facade';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MakeTransferComponent,
        ReviewTransferComponent,
        TransactionListComponent,
        FilterByPipe,
      ],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        BbUIModule,
      ],
      providers: [BankFacade],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should load transactions', () => {
    const spy = jest.spyOn(app.bankFacade, 'loadTransactions');
    app.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset form on confirm', () => {
    const transferData: Transfer = {
      toAccount: 'Backbase',
      amount: 1000,
    };
    app.confirmTransfer(transferData);
    const transferForm = jest.spyOn(app.makeTransferComp, 'reset');
    app.bsModalRef.content.event.emit(transferData);
    expect(transferForm).toHaveBeenCalled();
  });

  it('should unsubscribe model subscription', () => {
    app.modelSub = new Subscription();
    const spy = jest.spyOn(app.modelSub, 'unsubscribe');
    app.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
