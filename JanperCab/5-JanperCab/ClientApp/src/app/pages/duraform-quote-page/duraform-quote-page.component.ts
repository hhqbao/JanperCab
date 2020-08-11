import { plainToClass } from 'class-transformer';
import { DialogService } from './../../_services/dialog.service';
import { DuraformQuoteService } from './../../_services/duraform-quote.service';
import { DuraformQuoteDto } from './../../_models/duraform-order/DuraformQuoteDto';
import { LayoutService } from './../../_services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-quote-page',
  templateUrl: 'duraform-quote-page.component.html',
})
export class DuraformQuotePageComponent implements OnInit {
  isLoading = true;

  quoteDto: DuraformQuoteDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layout: LayoutService,
    private dialog: DialogService,
    private quoteService: DuraformQuoteService
  ) {}

  ngOnInit() {
    this.loadQuoteDetails();
  }

  private loadQuoteDetails = () => {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;

      if (id) {
        this.layout.showLoadingPanel();
        this.quoteService.get(id).subscribe(
          (response) => {
            this.quoteDto = response;
            console.log(this.quoteDto);
            this.isLoading = false;
            this.layout.closeLoadingPanel();
          },
          (error) => {
            this.layout.closeLoadingPanel();
            this.dialog.error(error);
            this.router.navigate(['dashboard/quotes']);
          }
        );
      } else {
        this.router.navigate(['dashboard/quotes']);
      }
    });
  };
}
