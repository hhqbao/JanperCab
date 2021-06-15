import { DuraformWrapColorDto } from './../../_models/duraform-wrap-color/DuraformWrapColorDto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-card',
  templateUrl: 'color-card.component.html',
})
export class ColorCardComponent implements OnInit {
  @Input() color: DuraformWrapColorDto;
  @Input() showType = false;

  @Output() pick = new EventEmitter<DuraformWrapColorDto>();

  isLoadingImage = true;

  constructor() {}

  ngOnInit() {}
}
