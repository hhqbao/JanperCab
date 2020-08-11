import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-box',
  templateUrl: 'simple-box.component.html',
})
export class SimpleBoxComponent implements OnInit {
  @Input() heading: string;

  constructor() {}

  ngOnInit() {}
}
