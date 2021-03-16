import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duraform-quote-page',
  templateUrl: 'duraform-quote-page.component.html',
})
export class DuraformQuotePageComponent implements OnInit {
  isLoading = true;

  // quoteDto: DuraformQuoteDto;

  constructor() {}

  ngOnInit() {
    this.loadQuoteDetails();
  }

  private loadQuoteDetails = () => {
    // this.activatedRoute.params.subscribe((params) => {
    //   const id = params.id;
    //   if (id) {
    //     this.layout.showLoadingPanel();
    //     this.quoteService.get(id).subscribe(
    //       (response) => {
    //         this.quoteDto = response;
    //         console.log(this.quoteDto);
    //         this.isLoading = false;
    //         this.layout.closeLoadingPanel();
    //       },
    //       (error) => {
    //         this.layout.closeLoadingPanel();
    //         this.dialog.error(error);
    //         this.router.navigate(['dashboard/quotes']);
    //       }
    //     );
    //   } else {
    //     this.router.navigate(['dashboard/quotes']);
    //   }
    // });
  };
}
