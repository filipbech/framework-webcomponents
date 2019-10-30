import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [BrowserModule, ButtonModule ],
  declarations: [],
  providers: []
})
export class AppModule {
    constructor(private injector: Injector) {

    }

    ngDoBootstrap() {}
}
