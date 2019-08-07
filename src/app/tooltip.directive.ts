import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(private elRef: ElementRef) { }

  @Input() title: string = "";

  createTooltip(): void {
  	this.removeTooltip();
  	let html = '<div class="app-tooltip"><span class="message">' + this.title + '</span></div>';
  	this.elRef.nativeElement.insertAdjacentHTML('afterend', html);
  	this.positionTooltip();
  }

  positionTooltip(): void {
  	let $tooltip = $(this.elRef.nativeElement).siblings(".app-tooltip");
  	if ($tooltip.length > 0) {
  		let tooltipHeight = $tooltip.height();
  		let elPosition = this.elRef.nativeElement.getBoundingClientRect(); 		
  		//we are making sure tooltip fits on top
  		if (elPosition.top > tooltipHeight + 15) {
  			let elHeight = $(this.elRef.nativeElement).height();
  			let bottomOffset = tooltipHeight + 45 + elHeight;
  			$tooltip.css({ 'bottom': bottomOffset });
  			$tooltip.addClass('top');
  		} else {
  			$tooltip.css({ 'bottom': '0' });
  			$tooltip.removeClass('top');
  		}
  	}  	
  }

  removeTooltip(): void {
  	$(this.elRef.nativeElement).siblings(".app-tooltip").remove();
  }

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if(this.elRef.nativeElement.contains(event.target)) {
      this.createTooltip();
    } else {
      this.removeTooltip();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event) {
  	this.removeTooltip();
  }

  @HostListener('window:scroll',  ['$event.target'])
  onScroll(el) {
  	this.positionTooltip();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.positionTooltip();
  }

}
