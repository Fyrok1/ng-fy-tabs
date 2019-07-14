import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ngFyRipple]'
})
export class RippleDirective {

  constructor(
    private el?:ElementRef
  ) { }

  @HostListener('click',['$event']) onClick(event){
    let child = document.createElement('div'),
    weight = this.el.nativeElement.offsetHeight > this.el.nativeElement.offsetWidth ? this.el.nativeElement.offsetHeight : this.el.nativeElement.offsetWidth;    
    child.style.height = (weight*2.4)+"px";
    child.style.width = (weight*2.4)+"px";
    child.style.left = (event.offsetX)+"px";
    child.style.top = (event.offsetY)+"px";
    child.classList.add('ripple-div');
    this.el.nativeElement.appendChild(child);
    setTimeout(() => {
      this.el.nativeElement.removeChild(child);
    }, 1000);
  }

}
