import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BbUIModule } from '@bb/bb-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BbUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
