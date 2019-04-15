import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonComponent],
  entryComponents: [ButtonComponent]
})
export class ButtonModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(ButtonComponent, { injector });
    customElements.define('custom-button', customButton);
  }

  ngDoBootstrap() {}
 }
