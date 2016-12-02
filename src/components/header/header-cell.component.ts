import {
  Component, Input, EventEmitter, Output, HostBinding
} from '@angular/core';

import { SortDirection, SortType } from '../../types';
import { nextSortDir } from '../../utils';

@Component({
  selector: 'data-table-header-cell',
  template: `
    <div>
      <label
        *ngIf="column.checkboxable && column.headerCheckboxable" 
        class="data-table-checkbox">
        <input 
          type="checkbox"
          [attr.checked]="allRowsSelected"
          (change)="select.emit(!allRowsSelected)" 
        />
      </label>
      <span
        class="data-table-header-cell-label draggable"
        *ngIf="!column.headerTemplate"
        (click)="onSort()"
        [innerHTML]="name">
      </span>
      <template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngOutletContext]="{ 
          column: column, 
          sortDir: sortDir
        }">
      </template>
      <span
        class="sort-btn"
        [ngClass]="sortClasses(sortDir)">
      </span>
    </div>
  `
})
export class DataTableHeaderCellComponent {

  @Input() sortType: SortType;
  @Input() column: any;
  @Input() sortAscendingIcon: string;
  @Input() sortDescendingIcon: string;
  @Input() allRowsSelected: boolean;

  @HostBinding('style.height.px')
  @Input() headerHeight: number;

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'data-table-header-cell';

    if(this.column.sortable) cls += ' sortable';
    if(this.column.resizeable) cls += ' resizeable';

    const sortDir = this.sortDir;
    if(sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

  @HostBinding('attr.title')
  private get name(): string {
    return this.column.name || this.column.prop;
  }

  @HostBinding('style.minWidth.px')
  private get minWidth(): number {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  private get maxWidth(): number {
    return this.column.maxWidth;
  }

  @HostBinding('style.width.px')
  private get width(): number {
    return this.column.width;
  }

  private sortDir: SortDirection;
  private _sorts: any[];

  sortClasses(dir: SortDirection): any {
    let result = {};

    if(dir === SortDirection.asc) {
      result[`sort-asc ${this.sortAscendingIcon}`] = true;
    } else if(dir === SortDirection.desc) {
      result[`sort-desc ${this.sortDescendingIcon}`] = true;
    }

    return result;
  }

  calcSortDir(sorts: any[]) {
    if(sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if(sort) return sort.dir;
    }
  }

  onSort(): void {
    if(!this.column.sortable) return;

    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

}
