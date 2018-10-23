import {
  Component, Output, EventEmitter, Input, HostBinding, ChangeDetectorRef,
  ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import { translateXY, columnsByPin, columnGroupWidths, RowHeightCache } from '../../utils';
import { SelectionType } from '../../types';
import { ScrollerComponent } from './scroller.component';
import { MouseEvent } from '../../events';

@Component({
  selector: 'datatable-body',
  template: `
    <datatable-selection
      #selector
      [selected]="selected"
      [rows]="rows"
      [selectCheck]="selectCheck"
      [selectEnabled]="selectEnabled"
      [selectionType]="selectionType"
      [rowIdentity]="rowIdentity"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)">
      <datatable-progress
        *ngIf="loadingIndicator">
      </datatable-progress>
      <datatable-scroller
        *ngIf="rows?.length"
        [scrollbarV]="scrollbarV"
        [scrollbarH]="scrollbarH"
        [scrollHeight]="scrollHeight"
        [scrollWidth]="columnGroupWidths?.total"
        (scroll)="onBodyScroll($event)">
        <datatable-summary-row
          *ngIf="summaryRow && summaryPosition === 'top'"
          [rowHeight]="summaryHeight"
          [offsetX]="offsetX"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns">
        </datatable-summary-row>
        <datatable-row-wrapper
          [groupedRows]="groupedRows"
          *ngFor="let group of temp; let i = index; trackBy: rowTrackingFn;"
          [innerWidth]="innerWidth"
          [ngStyle]="getRowsStyles(group)"
          [rowDetail]="groupedRows ? null : rowDetail"
          [groupHeader]="groupHeader"
          [offsetX]="offsetX"
          [detailRowHeight]="getDetailRowHeight(group[i],i)"
          [row]="group"
          [expanded]="getRowExpanded(group)"
          [rowIndex]="getRowIndex(group[i])"
          (rowContextmenu)="rowContextmenu.emit($event)">
          <datatable-body-row
            *ngIf="!groupedRows; else groupedRowsTemplate"
            tabindex="-1"
            [isSelected]="selector.getRowSelected(group)"
            [innerWidth]="innerWidth"
            [offsetX]="offsetX"
            [columns]="columns"
            [rowHeight]="getRowHeight(group)"
            [row]="group"
            [rowIndex]="getRowIndex(group)"
            [expanded]="getRowExpanded(group)"
            [rowClass]="rowClass"
            [displayCheck]="displayCheck"
            [treeStatus]="group.treeStatus"
            (treeAction)="onTreeAction(group)"
            (activate)="selector.onActivate($event, indexes.first + i)">
          </datatable-body-row>
          <ng-template #groupedRowsTemplate>
            <datatable-row-wrapper
              *ngFor="let row of group.value; let i = index; trackBy: rowTrackingFn;"
              [innerWidth]="innerWidth"
              [rowDetail]="rowDetail"
              [offsetX]="offsetX"
              [detailRowHeight]="getDetailRowHeight(group[i],i)"
              [row]="row"
              [expanded]="getRowExpanded(row)"
              [rowIndex]="getRowIndex(row[i])"
              (rowContextmenu)="rowContextmenu.emit($event)">
              <datatable-body-row
                tabindex="-1"
                [isSelected]="selector.getRowSelected(row)"
                [innerWidth]="innerWidth"
                [offsetX]="offsetX"
                [columns]="columns"
                [rowHeight]="getRowHeight(row)"
                [row]="row"
                [group]="group.value"
                [rowIndex]="getRowIndex(row)"
                [expanded]="getRowExpanded(row)"
                [rowClass]="rowClass"
                (activate)="selector.onActivate($event, i)">
              </datatable-body-row>
            </datatable-row-wrapper>
          </ng-template>
        </datatable-row-wrapper>
        <datatable-summary-row
          *ngIf="summaryRow && summaryPosition === 'bottom'"
          [ngStyle]="getBottomSummaryRowStyles()"
          [rowHeight]="summaryHeight"
          [offsetX]="offsetX"
          [innerWidth]="innerWidth"
          [rows]="rows"
          [columns]="columns">
        </datatable-summary-row>
      </datatable-scroller>
      <div
        class="empty-row"
        *ngIf="!rows?.length && !loadingIndicator"
        [innerHTML]="emptyMessage">
      </div>
    </datatable-selection>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'datatable-body'
  }
})
export class DataTableBodyComponent implements OnInit, OnDestroy {

  @Input() scrollbarV: boolean;
  @Input() scrollbarH: boolean;
  @Input() loadingIndicator: boolean;
  @Input() externalPaging: boolean;
  @Input() rowHeight: number | ((row?: any) => number);
  @Input() offsetX: number;
  @Input() emptyMessage: string;
  @Input() selectionType: SelectionType;
  @Input() selected: any[] = [];
  @Input() rowIdentity: any;
  @Input() rowDetail: any;
  @Input() groupHeader: any;
  @Input() selectCheck: any;
  @Input() displayCheck: any;
  @Input() trackByProp: string;
  @Input() rowClass: any;
  @Input() groupedRows: any;
  @Input() groupExpansionDefault: boolean;
  @Input() innerWidth: number;
  @Input() groupRowsBy: string;
  @Input() virtualization: boolean;
  @Input() summaryRow: boolean;
  @Input() summaryPosition: string;
  @Input() summaryHeight: number;

  @Input() set pageSize(val: number) {
    this._pageSize = val;
    this.recalcLayout();
  }

  get pageSize(): number {
    return this._pageSize;
  }

  @Input() set rows(val: any[]) {
    this._rows = val;
    this.rowExpansions.clear();
    this.recalcLayout();
  }

  get rows(): any[] {
    return this._rows;
  }

  @Input() set columns(val: any[]) {
    this._columns = val;
    const colsByPin = columnsByPin(val);
    this.columnGroupWidths = columnGroupWidths(colsByPin, val);
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() set offset(val: number) {
    this._offset = val;
    this.recalcLayout();
  }

  get offset(): number {
    return this._offset;
  }

  @Input() set rowCount(val: number) {
    this._rowCount = val;
    this.recalcLayout();
  }

  get rowCount(): number {
    return this._rowCount;
  }

  @HostBinding('style.width')
  get bodyWidth(): string {
    if (this.scrollbarH) {
      return this.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  @Input()
  @HostBinding('style.height')
  set bodyHeight(val) {
    if (this.scrollbarV) {
      this._bodyHeight = val + 'px';
    } else {
      this._bodyHeight = 'auto';
    }

    this.recalcLayout();
  }

  get bodyHeight() {
    return this._bodyHeight;
  }

  @Output() scroll: EventEmitter<any> = new EventEmitter();
  @Output() page: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() detailToggle: EventEmitter<any> = new EventEmitter();
  @Output() rowContextmenu = new EventEmitter<{ event: MouseEvent, row: any }>(false);
  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  @ViewChild(ScrollerComponent) scroller: ScrollerComponent;

  /**
   * Returns if selection is enabled.
   */
  get selectEnabled(): boolean {
    return !!this.selectionType;
  }

  /**
   * Property that would calculate the height of scroll bar
   * based on the row heights cache for virtual scroll and virtualization. Other scenarios
   * calculate scroll height automatically (as height will be undefined).
   */
  get scrollHeight(): number | undefined {
    if (this.scrollbarV && this.virtualization && this.rowCount) {
      return this.rowHeightsCache.query(this.rowCount - 1);
    }
    // avoid TS7030: Not all code paths return a value.
    return undefined;
  }

  rowHeightsCache: RowHeightCache = new RowHeightCache();
  temp: any[] = [];
  offsetY: number = 0;
  indexes: any = {};
  columnGroupWidths: any;
  columnGroupWidthsWithoutGroup: any;
  rowTrackingFn: any;
  listener: any;
  rowIndexes: any = new Map();
  rowExpansions: any = new Map();

  _rows: any[];
  _bodyHeight: any;
  _columns: any[];
  _rowCount: number;
  _offset: number;
  _pageSize: number;

  /**
   * Creates an instance of DataTableBodyComponent.
   */
  constructor(private cd: ChangeDetectorRef) {
    // declare fn here so we can get access to the `this` property
    this.rowTrackingFn = function(this: any, index: number, row: any): any {
      const idx = this.getRowIndex(row);
      if (this.trackByProp) {
        return `${idx}-${this.trackByProp}`;
      } else {
        return idx;
      }
    }.bind(this);

  }

  /**
   * Called after the constructor, initializing input properties
   */
  ngOnInit(): void {
    if (this.rowDetail) {
      this.listener = this.rowDetail.toggle
        .subscribe(({ type, value }: { type: string, value: any }) => {
          if (type === 'row') this.toggleRowExpansion(value);
          if (type === 'all') this.toggleAllRows(value);

          // Refresh rows after toggle
          // Fixes #883
          this.updateIndexes();
          this.updateRows();
          this.cd.markForCheck();
        });
    }

    if (this.groupHeader) {
      this.listener = this.groupHeader.toggle
        .subscribe(({ type, value }: { type: string, value: any }) => {
          if (type === 'group') this.toggleRowExpansion(value);
          if (type === 'all') this.toggleAllRows(value);

          // Refresh rows after toggle
          // Fixes #883
          this.updateIndexes();
          this.updateRows();
          this.cd.markForCheck();
        });
    }
  }

  /**
   * Called once, before the instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.rowDetail) this.listener.unsubscribe();
    if (this.groupHeader) this.listener.unsubscribe();
  }

  /**
   * Updates the Y offset given a new offset.
   */
  updateOffsetY(offset?: number): void {
    // scroller is missing on empty table
    if (!this.scroller) return;

    if (this.scrollbarV && this.virtualization && offset) {
      // First get the row Index that we need to move to.
      const rowIndex = this.pageSize * offset;
      offset = this.rowHeightsCache.query(rowIndex - 1);
    } else if (this.scrollbarV && !this.virtualization) {
      offset = 0;
    }

    this.scroller.setOffset(offset || 0);
  }

  /**
   * Body was scrolled, this is mainly useful for
   * when a user is server-side pagination via virtual scroll.
   */
  onBodyScroll(event: any): void {
    const scrollYPos: number = event.scrollYPos;
    const scrollXPos: number = event.scrollXPos;

    // if scroll change, trigger update
    // this is mainly used for header cell positions
    if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
      this.scroll.emit({
        offsetY: scrollYPos,
        offsetX: scrollXPos
      });
    }

    this.offsetY = scrollYPos;
    this.offsetX = scrollXPos;

    this.updateIndexes();
    this.updatePage(event.direction);
    this.updateRows();
  }

  /**
   * Updates the page given a direction.
   */
  updatePage(direction: string): void {
    let offset = this.indexes.first / this.pageSize;

    if (direction === 'up') {
      offset = Math.ceil(offset);
    } else if (direction === 'down') {
      offset = Math.floor(offset);
    }

    if (direction !== undefined && !isNaN(offset)) {
      this.page.emit({ offset });
    }
  }

  /**
   * Updates the rows in the view port
   */
  updateRows(): void {
    const { first, last } = this.indexes;
    let rowIndex = first;
    let idx = 0;
    const temp: any[] = [];

    this.rowIndexes.clear();

    // if grouprowsby has been specified treat row paging
    // parameters as group paging parameters ie if limit 10 has been
    // specified treat it as 10 groups rather than 10 rows
    if(this.groupedRows) {
      let maxRowsPerGroup = 3;
      // if there is only one group set the maximum number of
      // rows per group the same as the total number of rows
      if (this.groupedRows.length === 1) {
        maxRowsPerGroup = this.groupedRows[0].value.length;
      }

      while (rowIndex < last && rowIndex < this.groupedRows.length) {
        // Add the groups into this page
        const group = this.groupedRows[rowIndex];
        temp[idx] = group;
        idx++;

        // Group index in this context
        rowIndex++;
      }
    } else {
      while (rowIndex < last && rowIndex < this.rowCount) {
        const row = this.rows[rowIndex];

        if (row) {
          this.rowIndexes.set(row, rowIndex);
          temp[idx] = row;
        }

        idx++;
        rowIndex++;
      }
    }

    this.temp = temp;
  }

  /**
   * Get the row height
   */
  getRowHeight(row: any): number {
    // if its a function return it
    if (typeof this.rowHeight === 'function') {
      return this.rowHeight(row);
    }

    return this.rowHeight;
  }

  /**
   * @param group the group with all rows
   */
  getGroupHeight(group: any): number {
    let rowHeight: number = 0;

    if (group.value) {
      for (let index = 0; index < group.value.length; index++) {
        rowHeight += this.getRowAndDetailHeight(group.value[index]);
      }
    }

    return rowHeight;
  }

  /**
   * Calculate row height based on the expanded state of the row.
   */
  getRowAndDetailHeight(row: any): number {
    let rowHeight = this.getRowHeight(row);
    const expanded = this.rowExpansions.get(row);

    // Adding detail row height if its expanded.
    if (expanded === 1) {
      rowHeight += this.getDetailRowHeight(row);
    }

    return rowHeight;
  }

  /**
   * Get the height of the detail row.
   */
  getDetailRowHeight = (row?: any, index?: any): number => {
    if (!this.rowDetail) return 0;
    const rowHeight = this.rowDetail.rowHeight;
    return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
  }

  /**
   * Calculates the styles for the row so that the rows can be moved in 2D space
   * during virtual scroll inside the DOM.   In the below case the Y position is
   * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
   * 100 px then following styles are generated:
   *
   * transform: translate3d(0px, 0px, 0px);    ->  row0
   * transform: translate3d(0px, 30px, 0px);   ->  row1
   * transform: translate3d(0px, 130px, 0px);  ->  row2
   *
   * Row heights have to be calculated based on the row heights cache as we wont
   * be able to determine which row is of what height before hand.  In the above
   * case the positionY of the translate3d for row2 would be the sum of all the
   * heights of the rows before it (i.e. row0 and row1).
   *
   * @param {*} rows The row that needs to be placed in the 2D space.
   * @returns {*} Returns the CSS3 style to be applied
   *
   * @memberOf DataTableBodyComponent
   */
  getRowsStyles(rows: any): any {
    const styles = {};

    // only add styles for the group if there is a group
    if (this.groupedRows) {
      styles['width'] = this.columnGroupWidths.total;
    }

    if (this.scrollbarV && this.virtualization) {
      let idx = 0;

      if (this.groupedRows) {
        // Get the latest row rowindex in a group
        const row = rows[rows.length - 1];
        idx = row ? this.getRowIndex(row) : 0;
      } else {
        idx = this.getRowIndex(rows);
      }

      // const pos = idx * rowHeight;
      // The position of this row would be the sum of all row heights
      // until the previous row position.
      const pos = this.rowHeightsCache.query(idx - 1);

      translateXY(styles, 0, pos);
    }

    return styles;
  }

  /**
   * Calculate bottom summary row offset for scrollbar mode.
   * For more information about cache and offset calculation
   * see description for `getRowsStyles` method
   *
   * @returns {*} Returns the CSS3 style to be applied
   *
   * @memberOf DataTableBodyComponent
   */
  getBottomSummaryRowStyles(): any {
    if (!this.scrollbarV || !this.rows || !this.rows.length) {
      return null;
    }

    const styles = { position: 'absolute' };
    const pos = this.rowHeightsCache.query(this.rows.length - 1);

    translateXY(styles, 0, pos);

    return styles;
  }

  /**
   * Hides the loading indicator
   */
  hideIndicator(): void {
    setTimeout(() => this.loadingIndicator = false, 500);
  }

  /**
   * Updates the index of the rows in the viewport
   */
  updateIndexes(): void {
    let first = 0;
    let last = 0;

    if (this.scrollbarV) {
      if (this.virtualization) {
        // Calculation of the first and last indexes will be based on where the
        // scrollY position would be at.  The last index would be the one
        // that shows up inside the view port the last.
        const height = parseInt(this.bodyHeight, 0);
        first = this.rowHeightsCache.getRowIndex(this.offsetY);
        last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
      } else {
        // If virtual rows are not needed
        // We render all in one go
        first = 0;
        last = this.rowCount;
      }
    } else {
      // The server is handling paging and will pass an array that begins with the
      // element at a specified offset.  first should always be 0 with external paging.
      if (!this.externalPaging) {
        first = Math.max(this.offset * this.pageSize, 0);
      }
      last = Math.min((first + this.pageSize), this.rowCount);
    }

    this.indexes = { first, last };
  }

  /**
   * Refreshes the full Row Height cache.  Should be used
   * when the entire row array state has changed.
   */
  refreshRowHeightCache(): void {
    if (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) return;

    // clear the previous row height cache if already present.
    // this is useful during sorts, filters where the state of the
    // rows array is changed.
    this.rowHeightsCache.clearCache();

    // Initialize the tree only if there are rows inside the tree.
    if (this.rows && this.rows.length) {
      this.rowHeightsCache.initCache({
        rows: this.rows,
        rowHeight: this.rowHeight,
        detailRowHeight: this.getDetailRowHeight,
        externalVirtual: this.scrollbarV && this.externalPaging,
        rowCount: this.rowCount,
        rowIndexes: this.rowIndexes,
        rowExpansions: this.rowExpansions
      });
    }
  }

  /**
   * Gets the index for the view port
   */
  getAdjustedViewPortIndex(): number {
    // Capture the row index of the first row that is visible on the viewport.
    // If the scroll bar is just below the row which is highlighted then make that as the
    // first index.
    const viewPortFirstRowIndex = this.indexes.first;

    if (this.scrollbarV && this.virtualization) {
      const offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
      return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
    }

    return viewPortFirstRowIndex;
  }

  /**
   * Toggle the Expansion of the row i.e. if the row is expanded then it will
   * collapse and vice versa.   Note that the expanded status is stored as
   * a part of the row object itself as we have to preserve the expanded row
   * status in case of sorting and filtering of the row set.
   */
  toggleRowExpansion(row: any): void {
    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
    let expanded = this.rowExpansions.get(row);

    // If the detailRowHeight is auto --> only in case of non-virtualized scroll
    if (this.scrollbarV && this.virtualization) {
      const detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
      // const idx = this.rowIndexes.get(row) || 0;
      const idx = this.getRowIndex(row);
      this.rowHeightsCache.update(idx, detailRowHeight);
    }

    // Update the toggled row and update thive nevere heights in the cache.
    expanded = expanded ^= 1;
    this.rowExpansions.set(row, expanded);

    this.detailToggle.emit({
      rows: [row],
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Expand/Collapse all the rows no matter what their state is.
   */
  toggleAllRows(expanded: boolean): void {
    // clear prev expansions
    this.rowExpansions.clear();

    const rowExpanded = expanded ? 1 : 0;

    // Capture the row index of the first row that is visible on the viewport.
    const viewPortFirstRowIndex = this.getAdjustedViewPortIndex();

    for (const row of this.rows) {
      this.rowExpansions.set(row, rowExpanded);
    }

    if (this.scrollbarV) {
      // Refresh the full row heights cache since every row was affected.
      this.recalcLayout();
    }

    // Emit all rows that have been expanded.
    this.detailToggle.emit({
      rows: this.rows,
      currentIndex: viewPortFirstRowIndex
    });
  }

  /**
   * Recalculates the table
   */
  recalcLayout(): void {
    this.refreshRowHeightCache();
    this.updateIndexes();
    this.updateRows();
  }

  /**
   * Tracks the column
   */
  columnTrackingFn(index: number, column: any): any {
    return column.$$id;
  }

  /**
   * Gets the row pinning group styles
   */
  stylesByGroup(group: string) {
    const widths = this.columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = offsetDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

  /**
   * Returns if the row was expanded and set default row expansion when row expansion is empty
   */
  getRowExpanded(row: any): boolean {
    if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
      for (const group of this.groupedRows) {
        this.rowExpansions.set(group, 1);
      }
    }

    const expanded = this.rowExpansions.get(row);
    return expanded === 1;
  }

  /**
   * Gets the row index given a row
   */
  getRowIndex(row: any): number {
    return this.rowIndexes.get(row) || 0;
  }

  onTreeAction(row: any) {
    this.treeAction.emit({ row });
  }

}
