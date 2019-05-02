import { Input, Component, ViewEncapsulation, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'custom-button',
  template: `<h1>Im inside header</h1>
  <button (click)="handleClick()">
    <slot></slot>: {{clicksCt}}
  </button>`,
  styles: [`
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
