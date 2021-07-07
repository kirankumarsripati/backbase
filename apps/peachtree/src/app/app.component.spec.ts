import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BbUIModule } from '@bb/bb-ui';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { BankFacade } from './services/bank.facade';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MakeTransferComponent,
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
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
