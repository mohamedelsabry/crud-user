import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() receivedData: any[] = []; //data from all-products component
  @Output() sendEvent = new EventEmitter(); //to use Output should use EventEmmiter
  sendValueFn(event: any) {
    this.sendEvent.emit(event);
  }
}
