import { LayoutService } from './../../_services/layout.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'app-primary-top-nav',
  templateUrl: 'primary-top-nav.component.html',
})
export class PrimaryTopNavComponent implements OnInit {
  constructor(public layoutService: LayoutService) {}

  ngOnInit() {}
}
