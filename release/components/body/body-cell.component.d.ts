import { ChangeDetectorRef, EventEmitter, ElementRef, ViewContainerRef, OnDestroy, DoCheck } from '@angular/core';
import { SortDirection } from '../../types';
import { TableColumn } from '../../types/table-column.type';
export declare class DataTableBodyCellComponent implements DoCheck, OnDestroy {
    private cd;
    displayCheck: any;
    group: any;
    rowHeight: number;
    isSelected: boolean;
    expanded: boolean;
    rowIndex: number;
    column: TableColumn;
    row: any;
    sorts: any[];
    activate: EventEmitter<any>;
    cellTemplate: ViewContainerRef;
    readonly columnCssClasses: any;
    readonly width: number;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly height: string | number;
    sanitizedValue: any;
    value: any;
    sortDir: SortDirection;
    isFocused: boolean;
    onCheckboxChangeFn: any;
    activateFn: any;
    cellContext: any;
    private _isSelected;
    private _sorts;
    private _column;
    private _row;
    private _group;
    private _rowHeight;
    private _rowIndex;
    private _expanded;
    private _element;
    constructor(element: ElementRef, cd: ChangeDetectorRef);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    checkValueUpdates(): void;
    onFocus(): void;
    onBlur(): void;
    onClick(event: MouseEvent): void;
    onDblClick(event: MouseEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    onCheckboxChange(event: any): void;
    calcSortDir(sorts: any[]): any;
    stripHtml(html: string): string;
}
