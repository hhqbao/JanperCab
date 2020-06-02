import { DuraformWrapColorForSelection } from './../../_models/duraform-wrap-color/DuraformWrapColorForSelection';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-color-card',
  templateUrl: 'color-card.component.html',
})
export class ColorCardComponent implements OnInit {
  @Input() color: DuraformWrapColorForSelection;
  @Input() showType = false;
  isLoadingImage = true;

  constructor() {}

  ngOnInit() {}
}
