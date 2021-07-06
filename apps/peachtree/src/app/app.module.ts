import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BbUIModule } from '@bb/bb-ui';

import { AppComponent } from './app.component';
import { MakeTransferComponent } from './make-transfer/make-transfer.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
  declarations: [AppComponent, MakeTransferComponent, TransactionListComponent],
  imports: [
    BrowserModule,
    BbUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
