import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: 'box.component.html',
})
export class BoxComponent implements OnInit {
  @Input() headingText = 'Box Heading';

  constructor() {}

  ngOnInit() {}
}
