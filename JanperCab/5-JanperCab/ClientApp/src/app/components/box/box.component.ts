import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: 'box.component.html',
})
export class BoxComponent implements OnInit {
  @Input() headingText = 'Box Heading';
  @Input() isScrollable = false;
  @Input() showHeading = true;
  @Input() isTransparent = false;

  constructor() {}

  ngOnInit() {}
}
