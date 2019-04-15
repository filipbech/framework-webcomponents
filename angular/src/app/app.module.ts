import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    AppComponent
  ],
  bootstrap: []
})
export class AppModule {
  constructor(private ij: Injector) {
  }

  ngDoBootstrap() {
    const AppComponentCustomElement = createCustomElement(AppComponent, { injector: this.ij });
    customElements.define('my-app', AppComponentCustomElement);
  }
 }
