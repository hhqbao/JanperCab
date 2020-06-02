import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/layout.service';

@Component({
  selector: 'app-duraform-page',
  templateUrl: 'duraform-page.component.html',
})
export class DuraformPageComponent implements OnInit {
  constructor(private layout: LayoutService) {}

  ngOnInit() {
    this.layout.toggleLeftNav(true);
  }
}
