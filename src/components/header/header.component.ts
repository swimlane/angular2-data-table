import {
  Component, Output, EventEmitter, Input, HostBinding
} from '@angular/core';
import { SortType } from '../../types';
import { columnsByPin, columnGroupWidths, columnsByPinArr, translateXY } from '../../utils';
import { DataTableColumnDirective } from '../columns';

@Component({
  selector: 'data-table-header',
  template: `
    <div
      orderable
      (reorder)="onColumnReordered($event)"
      [style.width.px]="columnGroupWidths.total"
      class="data-table-header-inner">
      <div
        *ngFor="let colGroup of columnsByPin; trackBy: colGroup?.type"
        [class]="'data-table-row-' + colGroup.type"
        [ngStyle]="stylesByGroup(colGroup.type)">
        <data-table-header-cell
          *ngFor="let column of colGroup.columns; trackBy: column?.$$id"
          resizeable
          [resizeEnabled]="column.resizeable"
          (resize)="onColumnResized($event, column)"
          long-press
          (longPress)="drag = true"
          (longPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false"
          [dragModel]="column"
          [headerHeight]="headerHeight"
          [column]="column"
          [sortType]="sortType"
          [sorts]="sorts"
          [sortAscendingIcon]="sortAscendingIcon"
          [sortDescendingIcon]="sortDescendingIcon"
          (sort)="onSort($event)"
          (select)="select.emit($event)">
        </data-table-header-cell>
      </div>
    </div>
  `,
  host: {
    class: 'data-table-header'
  }
})
export class DataTableHeaderComponent {

  @Input() sortAscendingIcon: any;
  @Input() sortDescendingIcon: any;
  @Input() scrollbarH: boolean;
  @Input() innerWidth: number;
  @Input() offsetX: number;
  @Input() sorts: any[];
  @Input() sortType: SortType;
  @Input() allRowsSelected: boolean;

  @HostBinding('style.height')
  @Input() set headerHeight(val: any) {
    if(val !== 'auto') { 
      this._headerHeight = `${val}px`;
    } else {
      this._headerHeight = val;
    }
  }

  get headerHeight() {
    return this._headerHeight;
  }

  @Input() set columns(val: any[]) {
    this._columns = val;

    const colsByPin = columnsByPin(val);
    this.columnsByPin = columnsByPinArr(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

  get columns(): any[] { 
    return this._columns; 
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() reorder: EventEmitter<any> = new EventEmitter();
  @Output() resize: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  private columnsByPin: any;
  private columnGroupWidths: any;
  private _columns: any[];
  private _headerHeight: string;

  @HostBinding('style.width')
  private get headerWidth(): string {
    if(this.scrollbarH) {
      return this.innerWidth + 'px';
    }

    return '100%';
  }

  onColumnResized(width: number, column: DataTableColumnDirective) {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if(width >= column.maxWidth) {
      width = column.maxWidth;
    }

    this.resize.emit({
      column,
      prevValue: column.width,
      newValue: width
    });
  }

  onColumnReordered({ prevIndex, newIndex, model }: any) {
    this.reorder.emit({
      column: model,
      prevValue: prevIndex,
      newValue: newIndex
    });
  }

  onSort({ column, prevValue, newValue }: any) {
    const sorts = this.calcNewSorts(column, prevValue, newValue);
    this.sort.emit({
      sorts,
      column,
      prevValue,
      newValue
    });
  }

  calcNewSorts(column: any, prevValue: number, newValue: number) {
    let idx = 0;

    let sorts = this.sorts.map((s, i) => {
      s = Object.assign({}, s);
      if(s.prop === column.prop) idx = i;
      return s;
    });

    if (newValue === undefined) {
      sorts.splice(idx, 1);
    } else if (prevValue) {
      sorts[idx].dir = newValue;
    } else {
      if (this.sortType === SortType.single) {
        sorts.splice(0, this.sorts.length);
      }

      sorts.push({ dir: newValue, prop: column.prop });
    }

    return sorts;
  }

  stylesByGroup(group: string) {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
