import { DuraformDesignDto } from './../../_models/duraform-design/DuraformDesignDto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-design',
  templateUrl: 'duraform-design.component.html',
})
export class DuraformDesignComponent implements OnInit {
  @Input() design: DuraformDesignDto;

  @Output() selectDesign = new EventEmitter<DuraformDesignDto>();

  isLoadingImg = true;

  constructor() {}

  ngOnInit() {}
}
