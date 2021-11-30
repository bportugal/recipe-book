import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') openProp;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    console.log(event);
    console.log(this.elRef);
    this.openProp = this.elRef.nativeElement.contains(event.target) ? !this.openProp : false;
  }
  constructor(private elRef: ElementRef) {}
  /*
  @HostListener('click') toggleOpen() {
    this.openProp = !this.openProp;
  }*/

}
