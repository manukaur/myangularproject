import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor : string="transparent";

  @HostBinding('style.backgroundColor') backgroundColor : string='transparent';
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
ngOnInit()
{
  //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
}

@HostListener('mouseenter') mouseover()
{
  //this.renderer.setStyle(this.elRef.nativeElement,'background-color','blue');
this.backgroundColor='pink';
}

@HostListener('mouseleave') mouseleave()
{
  //this.renderer.setStyle(this.elRef.nativeElement,'background-color','red');
this.backgroundColor='yellow';
}
}
