import { Directive, HostListener, Input, HostBinding } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[animatedGradient]',
  standalone: true,
})
export class AnimatedGradientDirective {

  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#00f0ff', '#7f00ff'],
    thickness: '2px',
  };

  @HostBinding('style.border') borderStyle: string | null = null;
  @HostBinding('style.background-image') backgroundImageStyle: string | null = null;
  @HostBinding('style.background-origin') backgroundOriginStyle: string | null = null;
  @HostBinding('style.background-clip') backgroundClipStyle: string | null = null;

  private timerId: number | null = null;

  constructor() {}

  @HostListener('mouseenter')
  onEnter() {
    const delayTime: number = this.gradientConfiguration.delay ?? 1000;
    this.timerId = setTimeout(() => {
      const colors: string[] = this.gradientConfiguration.colors ?? ['#ff007f', '#7f00ff'];
      const thickness: string = this.gradientConfiguration.thickness ?? '2px';
      this.borderStyle = `${thickness} solid transparent`;
      this.backgroundImageStyle = `
        linear-gradient(#fff, #fff), 
        linear-gradient(to right, ${colors.join(', ')})
        `.trim();
      this.backgroundOriginStyle = 'border-box';
      this.backgroundClipStyle = 'padding-box, border-box';
    }, delayTime);
  }

  @HostListener('mouseleave')
  onLeave() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.borderStyle = null;
    this.backgroundImageStyle = null;
    this.backgroundOriginStyle = null;
    this.backgroundClipStyle = null;
  }

}
