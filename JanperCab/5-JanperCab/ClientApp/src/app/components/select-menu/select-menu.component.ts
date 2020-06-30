import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-menu',
  templateUrl: 'select-menu.component.html',
})
export class SelectMenuComponent implements OnInit {
  @Input() control: FormControl;
  @Input() values: any[] = [];
  @Input() valueKey: string;
  @Input() valueDisplay: string;

  @Input() allowNull = false;
  @Input() nullText = '-- NONE --';
  @Input() nullOnLabel = false;
  @Input() isDisabled = false;
  @Input() isTabIgnored = false;

  @Output() afterSet = new EventEmitter();

  @ViewChild('menuInput') menuInput: ElementRef;
  isFocused = false;
  currentIndex = -2;

  constructor(private ef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onBlur = (target: HTMLElement) => {
    const self = this.ef.nativeElement as HTMLElement;

    if (!self.contains(target)) {
      this.isFocused = false;
    }
  };

  @HostListener('keydown.Tab')
  @HostListener('keydown.Enter')
  @HostListener('keydown.Control')
  onTab = () => {
    this.isFocused = false;

    if (this.currentIndex > -2) {
      if (this.currentIndex === -1) {
        this.setValue(null);
      } else {
        const value = this.values[this.currentIndex];
        this.setValue(value);
      }
    }
  };

  @HostListener('keydown.ArrowUp', ['$event'])
  @HostListener('keydown.ArrowDown', ['$event'])
  onArrowKeyDown = (event) => {
    if (!this.isFocused) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        if (this.currentIndex === -2) {
          this.currentIndex = this.allowNull ? -1 : 0;
          return;
        }

        if (this.currentIndex === this.values.length - 1) {
          this.currentIndex = this.allowNull ? -1 : 0;
        } else {
          this.currentIndex++;
        }
        break;
      case 'ArrowUp':
        if (this.currentIndex === -2) {
          this.currentIndex = this.values.length - 1;
          return;
        }

        if (this.currentIndex === 0) {
          this.currentIndex = this.allowNull ? -1 : this.values.length - 1;
        } else {
          if (this.currentIndex <= -1) {
            this.currentIndex = this.values.length - 1;
          } else {
            this.currentIndex--;
          }
        }
        break;
      default:
        return;
    }
  };

  ngOnInit() {}

  get selectedValue(): any {
    if (this.control.value === null || this.control.value === undefined) {
      return null;
    }

    const selectedValue = this.values.find(
      (x) => x[this.valueKey].toString() === this.control.value.toString()
    );

    return selectedValue;
  }

  get displayedLabel(): string {
    if (this.selectedValue) {
      return this.selectedValue[this.valueDisplay];
    } else {
      if (this.allowNull) {
        return this.nullOnLabel ? this.nullText : '';
      } else {
        return '';
      }
    }
  }

  onFocus = () => {
    this.isFocused = true;

    this.adjustIndex();
  };

  onMouseEnter = (value) => {
    if (value === null) {
      this.currentIndex = -1;
    } else {
      this.currentIndex = this.values.indexOf(value);
    }
  };

  onSelect = (value) => {
    (this.menuInput.nativeElement as HTMLElement).focus();
    this.setValue(value);
    this.adjustIndex();
    this.isFocused = false;
  };

  private setValue = (value) => {
    if (value === null) {
      this.control.setValue(null);
    } else {
      this.control.setValue(value[this.valueKey]);
    }

    this.afterSet.emit();
  };

  private adjustIndex = () => {
    if (this.selectedValue) {
      this.currentIndex = this.values.indexOf(this.selectedValue);
    } else {
      if (this.allowNull) {
        this.currentIndex = -1;
      } else {
        this.currentIndex = -2;
      }
    }
  };
}
