import { DatepickerOptions } from 'ng2-datepicker';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: 'date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
  @Output() dateSelect = new EventEmitter<Date>();

  model: Date;
  options: DatepickerOptions = {
    minYear: new Date().getFullYear() - 30, // minimum available and selectable year
    maxYear: new Date().getFullYear(), // maximum available and selectable year
    placeholder: 'Please pick a date', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'dd/MM/yyyy', // date format to display in input
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default form__datepicker', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#dfe3e9', // in case you customize you theme, here you define scroll bar color
  };

  constructor() {}

  ngOnInit() {
    this.model = new Date();
  }

  onSelect = () => {
    this.dateSelect.emit(this.model);
  };
}
