import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[appRemoveTag]' })
export class RemoveTagDirective implements OnInit {
  constructor(private ef: ElementRef) {}

  ngOnInit(): void {
    const target = this.ef.nativeElement as HTMLElement;

    target.style.display = 'contents';
  }
}
