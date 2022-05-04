import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponent2]'
})
export class DynamicComponent2Directive {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
