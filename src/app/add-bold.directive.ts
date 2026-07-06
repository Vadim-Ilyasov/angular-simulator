import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[addBold]',
  standalone: true,
})
export class AddBoldDirective {

  constructor() {}

  @HostBinding('style.font-weight') fontWeight: string = 'bold';

  @HostListener('mouseenter')
  onEnter() {
    this.fontWeight = 'bold'
  }

  @HostListener('mouseleave')
  onLeave() {
    this.fontWeight = 'semi-bold';
  }

}
