import { Component } from '@angular/core';
import '../../../my-element.js';

@Component({
  selector: 'app-root',
  template: `
    <my-element
      [audienceProp]="audience"
      [attr.frameWork-attr]="framework"
      (customEvent)="handleEvent($event)"
      ></my-element>
  `
})
export class AppComponent {
  audience = { audience: 'world' };
  framework = 'angular';

  handleEvent(evt: CustomEvent) {
    alert('Hello' + evt.detail);
  }
}
