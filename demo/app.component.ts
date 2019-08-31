import { Component, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app',
  styleUrls: [
    '../src/themes/material.scss',
    '../src/themes/dark.scss',
    '../src/themes/bootstrap.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  template: `
    <div [class.dark]="state === 'dark'">
      <nav>
        <h3>ngx-datatable <small>({{version}})</small></h3>
        <ul class="main-ul">
          <li>
            <h4>Documentation</h4>
            <ul>
              <li>
                <a href="https://swimlane.gitbooks.io/ngx-datatable/content/" target="_black">Online</a>
              </li>
              <li>
                <a href="https://www.gitbook.com/download/pdf/book/swimlane/ngx-datatable" target="_black">PDF</a>
              </li>
            </ul>
          </li>
          <li>
            <h4>Basic</h4>
            <ul>
              <li><a href="#virtual-scroll" (click)="state='virtual-scroll'">10k Rows</a></li>
              <li><a href="#full-screen" (click)="state='full-screen'">Full Screen</a></li>
              <li><a href="#inline-edit" (click)="state='inline-edit'">Inline Editing</a></li>
              <li><a href="#horz-vert-scrolling" (click)="state='horz-vert-scrolling'">Horz/Vert Scrolling</a></li>
              <li><a href="#multiple-tables" (click)="state='multiple-tables'">Multiple Tables</a></li>
              <li><a href="#filter" (click)="state='filter'">Filtering</a></li>
              <li><a href="#hidden" (click)="state='hidden'">Hidden On Load</a></li>
              <li><a href="#live" (click)="state='live'">Live Data</a></li>
              <li><a href="#rx" (click)="state='rx'">RxJS</a></li>
              <li><a href="#contextmenu" (click)="state='contextmenu'">Context Menu</a></li>
              <li><a href="#css" (click)="state='css'">CSS Classes</a></li>
              <li><a href="#footer" (click)="state='footer'">Footer Template</a></li>
            </ul>
          </li>
          <li>
            <h4>Themes</h4>
            <ul>
              <li><a href="#dark" (click)="state='dark'">Dark theme</a></li>
              <li><a href="#bootstrap" (click)="state='bootstrap'">Bootstrap theme</a></li>
            </ul>
          </li>
          <li>
            <h4>Tree</h4>
            <ul>
              <li><a href="#fullscreen-tree" (click)="state='fullscreen-tree'">Full screen Tree</a></li>
              <li><a href="#client-tree" (click)="state='client-tree'">Client Side Tree</a></li>
            </ul>
          </li>
          <li>
            <h4>Rows</h4>
            <ul>
              <li><a href="#row-grouping" (click)="state='row-grouping'">Row Grouping</a></li>
              <li><a href="#" (click)="state=''">Fluid Row Height</a></li>
              <li><a href="#basic-fixed" (click)="state='basic-fixed'">Fixed Row Height</a></li>
              <li><a href="#dynamic" (click)="state='dynamic'">Dynamic Row Height</a></li>
              <li><a href="#row-details" (click)="state='row-details'">Row Detail</a></li>
              <li><a href="#row-grouping-detail" (click)="state='row-grouping-detail'">Row Group Details</a></li>
              <li><a href="#responsive" (click)="state='responsive'">Responsive</a></li>
            </ul>
          </li>
          <li>
            <h4>Paging</h4>
            <ul>
              <li><a href="#client-paging" (click)="state='client-paging'">Client-side</a></li>
              <li><a href="#server-paging" (click)="state='server-paging'">Server-side</a></li>
              <li><a href="#paging-scrolling-novirtualization" (click)="state='paging-scrolling-novirtualization'">Scrolling no virtual</a></li>
              <li><a href="#server-scrolling" (click)="state='server-scrolling'">Scrolling server-side</a></li>
              <li><a href="#virtual-paging" (click)="state='virtual-paging'">Virtual server-side</a></li>
            </ul>
          </li>
          <li>
            <h4>Sorting</h4>
            <ul>
              <li><a href="#client-sorting" (click)="state='client-sorting'">Client-side</a></li>
              <li><a href="#default-sorting" (click)="state='default-sorting'">Default sort</a></li>
              <li><a href="#server-sorting" (click)="state='server-sorting'">Server-side</a></li>
              <li><a href="#comparator-sorting" (click)="state='comparator-sorting'">Comparator</a></li>
            </ul>
          </li>
          <li>
            <h4>Selection</h4>
            <ul>
              <li><a href="#cell-selection" (click)="state='cell-selection'">Cell</a></li>
              <li><a href="#single-selection" (click)="state='single-selection'">Single Row</a></li>
              <li><a href="#multi-selection" (click)="state='multi-selection'">Multi Row</a></li>
              <li><a href="#multi-click-selection" (click)="state='multi-click-selection'">Multi Click Row</a></li>
              <li><a href="#multidisable-selection" (click)="state='multidisable-selection'">Disable Callback</a></li>
              <li><a href="#chkbox-selection" (click)="state='chkbox-selection'">Checkbox</a></li>
              <li><a href="#chkbox-selection-template" (click)="state='chkbox-selection-template'">Custom Checkbox</a></li>
            </ul>
          </li>
          <li>
            <h4>Templates</h4>
            <ul>
              <li><a href="#inline" (click)="state='inline'">Inline</a></li>
              <li><a href="#templateref" (click)="state='templateref'">TemplateRef</a></li>
            </ul>
          </li>
          <li>
            <h4>Column</h4>
            <ul>
              <li><a href="#flex" (click)="state='flex'">Flex</a></li>
              <li><a href="#toggle" (click)="state='toggle'">Toggling</a></li>
              <li><a href="#fixed" (click)="state='fixed'">Fixed</a></li>
              <li><a href="#force" (click)="state='force'">Force</a></li>
              <li><a href="#pinning" (click)="state='pinning'">Pinning</a></li>
              <li><a href="#reorder" (click)="state='reorder'">Reorder</a></li>
            </ul>
          </li>
          <li>
            <h4>Summary Row</h4>
            <ul>
              <li><a href="#simple-summary" (click)="state='simple-summary'">Simple</a></li>
              <li><a href="#custom-template-summary" (click)="state='custom-template-summary'">Custom Template</a></li>
              <li><a href="#paging-summary" (click)="state='paging-summary'">Server-side paging</a></li>
              <li><a href="#inline-html-summary" (click)="state='inline-html-summary'">Inline HTML</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <content>
        <!-- Basic -->
        <basic-auto-demo *ngIf="!state"></basic-auto-demo>
        <basic-fixed-demo *ngIf="state === 'basic-fixed'"></basic-fixed-demo>
        <full-screen-demo *ngIf="state === 'full-screen'"></full-screen-demo>
        <inline-edit-demo *ngIf="state === 'inline-edit'"></inline-edit-demo>
        <virtual-scroll-demo *ngIf="state === 'virtual-scroll'"></virtual-scroll-demo>
        <horz-vert-scrolling-demo *ngIf="state === 'horz-vert-scrolling'"></horz-vert-scrolling-demo>
        <multiple-tables-demo *ngIf="state === 'multiple-tables'"></multiple-tables-demo>
        <row-details-demo *ngIf="state === 'row-details'"></row-details-demo>
        <responsive-demo *ngIf="state === 'responsive'"></responsive-demo>
        <filter-demo *ngIf="state === 'filter'"></filter-demo>
        <tabs-demo *ngIf="state === 'hidden'"></tabs-demo>
        <live-data-demo *ngIf="state === 'live'"></live-data-demo>
        <rx-demo *ngIf="state === 'rx'"></rx-demo>
        <contextmenu-demo *ngIf="state === 'contextmenu'"></contextmenu-demo>
        <row-css-demo *ngIf="state === 'css'"></row-css-demo>
        <dynamic-height-demo *ngIf="state === 'dynamic'"></dynamic-height-demo>
        <footer-demo *ngIf="state === 'footer'"></footer-demo>

        <!-- Themes -->
        <basic-dark-theme-demo *ngIf="state === 'dark'"></basic-dark-theme-demo>
        <basic-bootstrap-theme-demo  *ngIf="state === 'bootstrap'"></basic-bootstrap-theme-demo>

        <!-- Tree -->
        <full-screen-tree-demo *ngIf="state === 'fullscreen-tree'"></full-screen-tree-demo>
        <client-side-tree-demo *ngIf="state === 'client-tree'"></client-side-tree-demo>

        <!-- Paging -->
        <row-grouping-demo *ngIf="state === 'row-grouping'"></row-grouping-demo>
        <row-grouping-details-demo *ngIf="state === 'row-grouping-detail'"></row-grouping-details-demo>
        <client-paging-demo *ngIf="state === 'client-paging'"></client-paging-demo>
        <server-paging-demo *ngIf="state === 'server-paging'"></server-paging-demo>
        <paging-scrolling-novirtualization-demo *ngIf="state === 'paging-scrolling-novirtualization'"></paging-scrolling-novirtualization-demo>
        <server-scrolling-demo *ngIf="state === 'server-scrolling'"></server-scrolling-demo>
        <virtual-paging-demo *ngIf="state === 'virtual-paging'"></virtual-paging-demo>

        <!-- Sorting -->
        <client-sorting-demo *ngIf="state === 'client-sorting'"></client-sorting-demo>
        <default-sorting-demo *ngIf="state === 'default-sorting'"></default-sorting-demo>
        <server-sorting-demo *ngIf="state === 'server-sorting'"></server-sorting-demo>
        <comparator-sorting-demo *ngIf="state === 'comparator-sorting'"></comparator-sorting-demo>

        <!-- Selection -->
        <cell-selection-demo *ngIf="state === 'cell-selection'"></cell-selection-demo>
        <single-selection-demo *ngIf="state === 'single-selection'"></single-selection-demo>
        <multi-selection-demo *ngIf="state === 'multi-selection'"></multi-selection-demo>
        <multidisable-selection-demo *ngIf="state === 'multidisable-selection'"></multidisable-selection-demo>
        <chkbox-selection-demo *ngIf="state === 'chkbox-selection'"></chkbox-selection-demo>
        <chkbox-selection-template-demo *ngIf="state === 'chkbox-selection-template'"></chkbox-selection-template-demo>
        <multi-click-selection-demo *ngIf="state === 'multi-click-selection'"></multi-click-selection-demo>

        <!-- Templates -->
        <template-ref-demo *ngIf="state === 'templateref'"></template-ref-demo>
        <inline-templates-demo *ngIf="state === 'inline'"></inline-templates-demo>

        <!-- Columns -->
        <column-flex-demo *ngIf="state === 'flex'"></column-flex-demo>
        <column-toggle-demo *ngIf="state === 'toggle'"></column-toggle-demo>
        <column-standard-demo *ngIf="state === 'fixed'"></column-standard-demo>
        <column-force-demo *ngIf="state === 'force'"></column-force-demo>
        <column-pinning-demo *ngIf="state === 'pinning'"></column-pinning-demo>
        <column-reorder-demo *ngIf="state === 'reorder'"></column-reorder-demo>

        <!-- Summary row -->
        <summary-row-simple-demo *ngIf="state === 'simple-summary'"></summary-row-simple-demo>
        <summary-row-custom-template-demo *ngIf="state === 'custom-template-summary'">
        </summary-row-custom-template-demo>
        <summary-row-server-paging-demo *ngIf="state === 'paging-summary'">
        </summary-row-server-paging-demo>
        <summary-row-inline-html *ngIf="state === 'inline-html-summary'"></summary-row-inline-html>
      </content>
    </div>
  `
})
export class AppComponent {

  get state() {
    return window.state;
  }

  set state(state) {
    window.state = state;
  }

  version: string = APP_VERSION;

  constructor(location: Location) {
    this.state = location.path(true);
  }

}
