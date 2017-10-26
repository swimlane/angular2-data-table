/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './pager.component';
import * as i2 from '@angular/common';
const styles_DataTablePagerComponent:any[] = ([] as any[]);
export const RenderType_DataTablePagerComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_DataTablePagerComponent,data:{}});
function View_DataTablePagerComponent_1(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),4,'li',[['class',
      'pages']],[[2,'active',(null as any)]],(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n        '])),(_l()(),i0.ɵeld(2,
      0,(null as any),(null as any),1,'a',[['href','javascript:void(0)']],(null as any),
      [[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.selectPage(_v.context.$implicit.number)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i0.ɵted(3,(null as any),['\n          ',
      '\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n      ']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = (_v.context.$implicit.number === _co.page);
        _ck(_v,0,0,currVal_0);
        const currVal_1:any = _v.context.$implicit.text;
        _ck(_v,3,0,currVal_1);
      });
}
export function View_DataTablePagerComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(2,[(_l()(),i0.ɵted(-1,(null as any),['\n    '])),(_l()(),i0.ɵeld(1,
      0,(null as any),(null as any),36,'ul',[['class','pager']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),
      ['\n      '])),(_l()(),i0.ɵeld(3,0,(null as any),(null as any),6,'li',([] as any[]),
      [[2,'disabled',(null as any)]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted(-1,(null as any),['\n        '])),(_l()(),i0.ɵeld(5,0,(null as any),
          (null as any),3,'a',[['href','javascript:void(0)']],(null as any),[[(null as any),
              'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i1.DataTablePagerComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.selectPage(1)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n          '])),
      (_l()(),i0.ɵeld(7,0,(null as any),(null as any),0,'i',([] as any[]),[[8,'className',
          0]],(null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n      '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n      '])),(_l()(),i0.ɵeld(11,0,(null as any),
          (null as any),6,'li',([] as any[]),[[2,'disabled',(null as any)]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),
          ['\n        '])),(_l()(),i0.ɵeld(13,0,(null as any),(null as any),3,'a',
          [['href','javascript:void(0)']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i1.DataTablePagerComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.prevPage()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n          '])),
      (_l()(),i0.ɵeld(15,0,(null as any),(null as any),0,'i',([] as any[]),[[8,'className',
          0]],(null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n      '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n      '])),(_l()(),i0.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_DataTablePagerComponent_1)),i0.ɵdid(20,
          802816,(null as any),0,i2.NgForOf,[i0.ViewContainerRef,i0.TemplateRef,i0.IterableDiffers],
          {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i0.ɵted(-1,(null as any),
          ['\n      '])),(_l()(),i0.ɵeld(22,0,(null as any),(null as any),6,'li',([] as any[]),
          [[2,'disabled',(null as any)]],(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n        '])),(_l()(),
          i0.ɵeld(24,0,(null as any),(null as any),3,'a',[['href','javascript:void(0)']],
              (null as any),[[(null as any),'click']],(_v,en,$event) => {
                var ad:boolean = true;
                var _co:i1.DataTablePagerComponent = _v.component;
                if (('click' === en)) {
                  const pd_0:any = ((<any>_co.nextPage()) !== false);
                  ad = (pd_0 && ad);
                }
                return ad;
              },(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n          '])),
      (_l()(),i0.ɵeld(26,0,(null as any),(null as any),0,'i',([] as any[]),[[8,'className',
          0]],(null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n      '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n      '])),(_l()(),i0.ɵeld(30,0,(null as any),
          (null as any),6,'li',([] as any[]),[[2,'disabled',(null as any)]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),
          ['\n        '])),(_l()(),i0.ɵeld(32,0,(null as any),(null as any),3,'a',
          [['href','javascript:void(0)']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i1.DataTablePagerComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.selectPage(_co.totalPages)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i0.ɵted(-1,(null as any),['\n          '])),
      (_l()(),i0.ɵeld(34,0,(null as any),(null as any),0,'i',([] as any[]),[[8,'className',
          0]],(null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted(-1,
          (null as any),['\n        '])),(_l()(),i0.ɵted(-1,(null as any),['\n      '])),
      (_l()(),i0.ɵted(-1,(null as any),['\n    '])),(_l()(),i0.ɵted(-1,(null as any),
          ['\n  ']))],(_ck,_v) => {
    var _co:i1.DataTablePagerComponent = _v.component;
    const currVal_4:any = _co.pages;
    _ck(_v,20,0,currVal_4);
  },(_ck,_v) => {
    var _co:i1.DataTablePagerComponent = _v.component;
    const currVal_0:boolean = !_co.canPrevious();
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i0.ɵinlineInterpolate(1,'',_co.pagerPreviousIcon,'');
    _ck(_v,7,0,currVal_1);
    const currVal_2:boolean = !_co.canPrevious();
    _ck(_v,11,0,currVal_2);
    const currVal_3:any = i0.ɵinlineInterpolate(1,'',_co.pagerLeftArrowIcon,'');
    _ck(_v,15,0,currVal_3);
    const currVal_5:boolean = !_co.canNext();
    _ck(_v,22,0,currVal_5);
    const currVal_6:any = i0.ɵinlineInterpolate(1,'',_co.pagerRightArrowIcon,'');
    _ck(_v,26,0,currVal_6);
    const currVal_7:boolean = !_co.canNext();
    _ck(_v,30,0,currVal_7);
    const currVal_8:any = i0.ɵinlineInterpolate(1,'',_co.pagerNextIcon,'');
    _ck(_v,34,0,currVal_8);
  });
}
export function View_DataTablePagerComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,0,(null as any),(null as any),1,'datatable-pager',
      [['class','datatable-pager']],(null as any),(null as any),(null as any),View_DataTablePagerComponent_0,
      RenderType_DataTablePagerComponent)),i0.ɵdid(1,49152,(null as any),0,i1.DataTablePagerComponent,
      ([] as any[]),(null as any),(null as any))],(null as any),(null as any));
}
export const DataTablePagerComponentNgFactory:i0.ComponentFactory<i1.DataTablePagerComponent> = i0.ɵccf('datatable-pager',
    i1.DataTablePagerComponent,View_DataTablePagerComponent_Host_0,{pagerLeftArrowIcon:'pagerLeftArrowIcon',
        pagerRightArrowIcon:'pagerRightArrowIcon',pagerPreviousIcon:'pagerPreviousIcon',
        pagerNextIcon:'pagerNextIcon',size:'size',count:'count',page:'page'},{change:'change'},
    ([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL2tqYW5uaXMvRG9jdW1lbnRzL1BlcnNvbmFsL25nLWRhdGF0YWJsZS9zcmMvY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL1VzZXJzL2tqYW5uaXMvRG9jdW1lbnRzL1BlcnNvbmFsL25nLWRhdGF0YWJsZS9zcmMvY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50LnRzIiwibmc6Ly8vVXNlcnMva2phbm5pcy9Eb2N1bWVudHMvUGVyc29uYWwvbmctZGF0YXRhYmxlL3NyYy9jb21wb25lbnRzL2Zvb3Rlci9wYWdlci5jb21wb25lbnQudHMuRGF0YVRhYmxlUGFnZXJDb21wb25lbnQuaHRtbCIsIm5nOi8vL1VzZXJzL2tqYW5uaXMvRG9jdW1lbnRzL1BlcnNvbmFsL25nLWRhdGF0YWJsZS9zcmMvY29tcG9uZW50cy9mb290ZXIvcGFnZXIuY29tcG9uZW50LnRzLkRhdGFUYWJsZVBhZ2VyQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiXG4gICAgPHVsIGNsYXNzPVwicGFnZXJcIj5cbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhblByZXZpb3VzKClcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0UGFnZSgxKVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwie3twYWdlclByZXZpb3VzSWNvbn19XCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuUHJldmlvdXMoKVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgICAgIChjbGljayk9XCJwcmV2UGFnZSgpXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJ7e3BhZ2VyTGVmdEFycm93SWNvbn19XCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpXG4gICAgICAgIGNsYXNzPVwicGFnZXNcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgcGcgb2YgcGFnZXNcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInBnLm51bWJlciA9PT0gcGFnZVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RQYWdlKHBnLm51bWJlcilcIj5cbiAgICAgICAgICB7e3BnLnRleHR9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuTmV4dCgpXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm5leHRQYWdlKClcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cInt7cGFnZXJSaWdodEFycm93SWNvbn19XCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuTmV4dCgpXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFBhZ2UodG90YWxQYWdlcylcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cInt7cGFnZXJOZXh0SWNvbn19XCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gICIsIjxkYXRhdGFibGUtcGFnZXI+PC9kYXRhdGFibGUtcGFnZXI+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O29CQ2dCTTtNQUFBO01BQUEsZ0JBR3NDLGtEQUNwQztNQUFBO01BQUE7UUFBQTtRQUFBO1FBRUU7VUFBQTtVQUFBO1FBQUE7UUFGRjtNQUFBLGdDQUVrQztNQUFBLGdCQUU5Qjs7O1FBTEo7UUFIRixXQUdFLFNBSEY7UUFNb0M7UUFBQTs7OztvQkF0QjFDLDhDQUNJO01BQUE7TUFBQSw0Q0FBa0I7TUFBQSxlQUNoQjtNQUFBO01BQXNDLGtEQUNwQztVQUFBO2NBQUE7WUFBQTtZQUFBO1lBRUU7Y0FBQTtjQUFBO1lBQUE7WUFGRjtVQUFBLGdDQUUwQjtNQUN4QjtVQUFBLDhEQUFxQztVQUFBLCtCQUNuQztNQUNELGdEQUNMO1VBQUE7VUFBQSw0Q0FBc0M7VUFBQSxpQkFDcEM7VUFBQTtVQUFBO1lBQUE7WUFBQTtZQUVFO2NBQUE7Y0FBQTtZQUFBO1lBRkY7VUFBQSxnQ0FFdUI7TUFDckI7VUFBQSw4REFBc0M7VUFBQSwrQkFDcEM7TUFDRCxnREFDTDtVQUFBLHNFQUFBO1VBQUE7VUFBQSx1Q0FTSztVQUFBLGVBQ0w7VUFBQTtVQUFBLGdCQUFrQyxrREFDaEM7aUJBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFFRTtrQkFBQTtrQkFBQTtnQkFBQTtnQkFGRjtjQUFBLGdDQUV1QjtNQUNyQjtVQUFBLDhEQUF1QztVQUFBLCtCQUNyQztNQUNELGdEQUNMO1VBQUE7VUFBQSw0Q0FBa0M7VUFBQSxpQkFDaEM7VUFBQTtVQUFBO1lBQUE7WUFBQTtZQUVFO2NBQUE7Y0FBQTtZQUFBO1lBRkY7VUFBQSxnQ0FFbUM7TUFDakM7VUFBQSw4REFBaUM7VUFBQSwrQkFDL0I7TUFDRCw4Q0FDRjtVQUFBOztJQXRCRDtJQUZGLFlBRUUsU0FGRjs7O0lBZEk7SUFBSixXQUFJLFNBQUo7SUFJTztJQUFILFdBQUcsU0FBSDtJQUdBO0lBQUosWUFBSSxTQUFKO0lBSU87SUFBSCxZQUFHLFNBQUg7SUFhQTtJQUFKLFlBQUksU0FBSjtJQUlPO0lBQUgsWUFBRyxTQUFIO0lBR0E7SUFBSixZQUFJLFNBQUo7SUFJTztJQUFILFlBQUcsU0FBSDs7OztvQkNyQ1Y7TUFBQTt3Q0FBQSxVQUFBO01BQUE7Ozs7OzsifQ==
