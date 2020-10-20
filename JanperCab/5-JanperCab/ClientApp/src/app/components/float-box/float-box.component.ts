import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-float-box',
  templateUrl: 'float-box.component.html',
})
export class FloatBoxComponent implements OnInit {
  @Input() width;
  @Input() isFit = false;

  constructor() {}

  ngOnInit() {}
}
