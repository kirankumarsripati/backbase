import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BbUIModule } from '@bb/bb-ui';

import { AppComponent } from './app.component';
import { MakeTransferComponent } from './components/make-transfer/make-transfer.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MakeTransferComponent,
    TransactionListComponent,
    FilterByPipe,
  ],
  imports: [
    BrowserModule,
    BbUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
