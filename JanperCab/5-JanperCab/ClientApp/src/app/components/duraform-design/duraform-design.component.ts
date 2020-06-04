import { DuraformOrderService } from './../../_services/duraform-order.service';
import { DuraformDesignForOrderMenu } from '../../_models/duraform-design/DuraformDesignForOrderMenu';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-duraform-design',
  templateUrl: 'duraform-design.component.html',
})
export class DuraformDesignComponent implements OnInit {
  @Input() design: DuraformDesignForOrderMenu;

  @Input() canSelect = true;
  @Input() showOrderDetails = false;

  @Output() selectDesign = new EventEmitter<DuraformDesignForOrderMenu>();

  isLoadingImg = true;

  constructor(public order: DuraformOrderService) {}

  ngOnInit() {}

  onSelectDesign = () => {
    this.selectDesign.emit(this.design);
  };
}
