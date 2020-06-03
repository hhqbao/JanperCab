import { DuraformWrapColorForSelection } from './../../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-card',
  templateUrl: 'color-card.component.html',
})
export class ColorCardComponent implements OnInit {
  @Input() color: DuraformWrapColorForSelection;
  @Input() showType = false;

  @Output() pick = new EventEmitter<DuraformWrapColorForSelection>();

  isLoadingImage = true;

  constructor() {}

  ngOnInit() {}

  onClick = () => {
    this.pick.emit(this.color);
  };
}
