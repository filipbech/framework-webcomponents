import { Input, Component, ViewEncapsulation, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'custom-button',
  template: `<h1>Im inside header</h1>
  <button (click)="handleClick()">
    <slot>{{label}}</slot>: {{clicksCt}}
    <slot name="icon"></slot>
  </button>`,
  styles: [`
    button {
      border: solid 3px;
      padding: 8px 10px;
      background: #bada55;
      font-size: 20px;
    }
    h1 {
      color:blue;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ButtonComponent {
  @Input() label = 'default label';
  @Output() action = new EventEmitter<number>();
  clicksCt = 0;

  handleClick() {
    this.clicksCt++;
    this.action.emit(this.clicksCt);
    this.cd.detectChanges();
  }
  constructor(private cd: ChangeDetectorRef) {}
}
