/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '../../../src/directives/visibility.directive';
import * as import1 from '@angular/core/src/change_detection/change_detection';
import * as import2 from '@angular/core/src/linker/view';
import * as import3 from '@angular/core/src/linker/view_utils';
export class Wrapper_VisibilityDirective {
  context:import0.VisibilityDirective;
  changed:boolean;
  /*private*/ _expr_0:any;
  constructor(p0:any,p1:any) {
    this.changed = false;
    this.context = new import0.VisibilityDirective(p0,p1);
    this._expr_0 = import1.UNINITIALIZED;
  }
  detectChangesInInputProps(view:import2.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this.changed;
    this.changed = false;
    return changed;
  }
  detectChangesInHostProps(view:import2.AppView<any>,el:any,throwOnChange:boolean):void {
    const currVal_0:any = this.context.isVisible;
    if (import3.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      view.renderer.setElementClass(el,'visible',currVal_0);
      this._expr_0 = currVal_0;
    }
  }
}