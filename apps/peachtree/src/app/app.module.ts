import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BbUIModule } from '@bb/bb-ui';

import { AppComponent } from './app.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { BankFacade } from './services/bank.facade';
import { ReviewTransferComponent } from './components/review-transfer/review-transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    MakeTransferComponent,
    TransactionListComponent,
    FilterByPipe,
    ReviewTransferComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BbUIModule,
  ],
  providers: [BankFacade],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
