import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: 'pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() page = 0;
  @Input() pageSize = 20;
  @Input() totalItemCount = 0;

  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  get pageList(): number[] {
    if (!this.totalItemCount) {
      return [];
    }

    const pageCount = Math.ceil(this.totalItemCount / this.pageSize);

    return Array.from(Array(pageCount).keys());
  }

  ngOnInit() {}

  onPageChange = (selectedPage: number) => {
    this.pageChange.emit(selectedPage);
  };
}
