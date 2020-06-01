import { Component, OnInit, Input } from '@angular/core';
import { DuraformDoorForOrderMenu } from 'src/app/_models/duraform-door/DuraformDoorForOrderMenu';
import { DuraformSerieForList } from 'src/app/_models/duraform-serie/DuraformSerieForList';
import { LayoutService } from 'src/app/_services/layout.service';
import { DuraformSerieService } from 'src/app/_services/duraform-serie.service';
import { DuraformDoorService } from 'src/app/_services/duraform-door.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-duraform-order-step-one',
  templateUrl: 'duraform-order-step-one.component.html',
})
export class DuraformOrderStepOneComponent implements OnInit {
  private duraformDoors: DuraformDoorForOrderMenu[] = [];

  duraformSeries: DuraformSerieForList[] = [];
  displayedDoors: DuraformDoorForOrderMenu[] = [];

  constructor(
    private layout: LayoutService,
    private duraformSerieService: DuraformSerieService,
    private duraformDoorService: DuraformDoorService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.layout.showLoadingPanel();
    forkJoin([this.loadSeries(), this.loadDuraformDoors()]).subscribe(
      (responses) => {
        this.duraformSeries = responses[0];
        this.duraformDoors = responses[1];
        this.onFilterChange({ serie: 0 });
        this.layout.closeLoadingPanel();
      },
      (error) => {
        this.dialog.error(error);
      }
    );
  }

  loadSeries = () => {
    return this.duraformSerieService.getAll();
  };

  loadDuraformDoors = () => {
    return this.duraformDoorService.getForOrderMenu();
  };

  onFilterChange = (changeValue: any) => {
    console.log(changeValue);

    if (changeValue.serie === null) {
      this.displayedDoors = this.duraformDoors.filter((x) =>
        x.name.toLowerCase().includes(changeValue.search.toLowerCase())
      );
    } else {
      if (changeValue.serie === 0) {
        this.displayedDoors = this.duraformDoors.filter((x) => x.isPopular);
      } else {
        this.displayedDoors = this.duraformDoors.filter(
          (x) => x.duraformSerieId === changeValue.serie
        );
      }
    }
  };
}
