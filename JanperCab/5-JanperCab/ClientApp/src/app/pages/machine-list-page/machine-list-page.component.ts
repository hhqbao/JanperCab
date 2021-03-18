import { LayoutService } from 'src/app/_services/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machine-list-page',
  templateUrl: 'machine-list-page.component.html',
})
export class MachineListPageComponent implements OnInit {
  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.toggleLeftNav(true);
  }
}
