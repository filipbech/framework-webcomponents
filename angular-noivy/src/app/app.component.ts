import { Component, Input, Output, ApplicationRef, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from 'events';
import 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {

  @Input() title = 'Angular';

  @Output() myEvent = new EventEmitter();

  constructor(private appRef: ApplicationRef) {
    setTimeout(() => {
      this.title = 'zup';
      // this.appRef.tick();
      this.myEvent.emit('yo');
    }, 1000);
  }

}
