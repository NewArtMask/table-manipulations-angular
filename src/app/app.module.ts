import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToArrayPipe } from './pipes/toArray.pipe';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';

@NgModule({
  declarations: [AppComponent, ToArrayPipe, CapitalizeFirstLetterPipe],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
