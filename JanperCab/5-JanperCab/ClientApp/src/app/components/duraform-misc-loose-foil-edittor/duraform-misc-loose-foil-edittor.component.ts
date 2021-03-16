import { FormGroup, FormBuilder } from '@angular/forms';
import { DuraformMiscComponentDto } from 'src/app/_models/duraform-misc-component/DuraformMiscComponentDto';
import { Component, OnInit } from '@angular/core';
import { DuraformMiscBaseEdittor } from '../duraform-misc-base-edittor/duraform-misc-base-edittor.component';

@Component({
  selector: 'app-duraform-misc-loose-foil-edittor',
  templateUrl: 'duraform-misc-loose-foil-edittor.component.html',
})
export class DuraformMiscLooseFoilEdittorComponent
  extends DuraformMiscBaseEdittor
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.updateInput.emit();
  }
}
