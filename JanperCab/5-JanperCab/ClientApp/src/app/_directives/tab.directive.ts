import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[appTab]' })
export class TabDirective implements OnInit {
  private headers: Element[];
  private pages: Element[];

  constructor(private ef: ElementRef) {}

  ngOnInit(): void {
    const self = this.ef.nativeElement as Element;

    const tabHeaders = self.querySelectorAll('.tab__headers')[0];
    const tabPages = self.querySelectorAll('.tab__pages')[0];

    if (tabPages) {
      this.headers = Array.from(tabHeaders.querySelectorAll('.header'));
      this.pages = Array.from(tabPages.querySelectorAll('.page'));
    }
  }

  @HostListener('click', ['$event.target'])
  onClickHeaders = (target: Element) => {
    if (target.classList.contains('header')) {
      const index = this.headers.indexOf(target);

      if (index > -1) {
        this.headers.forEach((header) => header.classList.remove('active'));
        this.pages.forEach((page) => page.classList.remove('active'));
        this.pages[index].classList.add('active');
        target.classList.add('active');
      }
    }
  };
}
