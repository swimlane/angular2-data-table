"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var math_1 = require('../utils/math');
var ColumnMode_1 = require('../enums/ColumnMode');
var TableOptions_1 = require('../models/TableOptions');
var TableColumn_1 = require('../models/TableColumn');
var DataTableColumn_1 = require('./DataTableColumn');
var State_1 = require('../services/State');
var DataTable = (function () {
    function DataTable(state, element, differs) {
        this.state = state;
        this.onPageChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onColumnChange = new core_1.EventEmitter();
        this.key = state.newInstance();
        this.element = element.nativeElement;
        this.element.classList.add('datatable');
        this.rowDiffer = differs.find({}).create(null);
        this.colDiffer = differs.find({}).create(null);
    }
    DataTable.prototype.ngOnInit = function () {
        var _a = this, options = _a.options, rows = _a.rows, selected = _a.selected;
        this.state
            .setOptions(this.key, options)
            .setRows(this.key, rows)
            .setSelected(this.key, selected);
        console.debug('State', this.state);
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.adjustColumns();
        if (this.columns.length) {
            setTimeout(function () {
                for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.options.columns.push(new TableColumn_1.TableColumn(col));
                }
            });
        }
    };
    DataTable.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.state.setRows(this.key, this.rows);
            this.onRowsUpdate.emit(this.rows);
        }
        this.checkColumnChanges();
    };
    DataTable.prototype.checkColumnChanges = function () {
        var colDiff = this.colDiffer.diff(this.options.columns);
        if (colDiff) {
            var chngd_1 = false;
            colDiff.forEachAddedItem(function () {
                chngd_1 = true;
                return false;
            });
            if (!chngd_1) {
                colDiff.forEachRemovedItem(function () {
                    chngd_1 = true;
                    return false;
                });
            }
            // if a column was added or removed
            // we need to re-adjust columns
            if (chngd_1)
                this.adjustColumns();
        }
    };
    DataTable.prototype.adjustSizes = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.state.setInnerWidth(this.key, Math.floor(width));
        if (this.options.scrollbarV) {
            if (this.options.headerHeight)
                height = height - this.options.headerHeight;
            if (this.options.footerHeight)
                height = height - this.options.footerHeight;
            this.state.setBodyHeight(this.key, height);
        }
        this.adjustColumns();
    };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.options.columns)
            return;
        var width = this.state.getInnerWidth(this.key);
        if (this.options.scrollbarV) {
            width = width - this.state.getScrollbarWidth(this.key);
        }
        if (this.options.columnMode === ColumnMode_1.ColumnMode.force) {
            math_1.forceFillColumnWidths(this.options.columns, width, forceIdx);
        }
        else if (this.options.columnMode === ColumnMode_1.ColumnMode.flex) {
            math_1.adjustColumnWidths(this.options.columns, width);
        }
    };
    DataTable.prototype.onPageChanged = function (action) {
        this.state.setPage(this.key, action);
        this.onPageChange.emit(action.page);
    };
    DataTable.prototype.onRowSelect = function (event) {
        this.state.setSelected(this.key, event);
        this.onSelectionChange.emit(event);
    };
    DataTable.prototype.resize = function () {
        this.adjustSizes();
    };
    Object.defineProperty(DataTable.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.options.headerHeight;
            return (typeof headerHeight === 'string') ? headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.options.rowHeight;
            return (typeof rowHeight === 'string') ? rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isVertScroll", {
        get: function () {
            return this.options.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isHorScroll", {
        get: function () {
            return this.options.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isSelectable", {
        get: function () {
            return this.options.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableOptions_1.TableOptions)
    ], DataTable.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowsUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSelectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColumnChange", void 0);
    __decorate([
        core_1.ContentChildren(DataTableColumn_1.DataTableColumn), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTable.prototype, "resize", null);
    __decorate([
        core_1.HostBinding('class.fixed-header'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isSelectable", null);
    DataTable = __decorate([
        core_1.Component({
            selector: 'datatable',
            template: "\n    <div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header\n        [key]=\"key\"\n        (onColumnChange)=\"onColumnChange.emit($event)\">\n      </datatable-header>\n      <datatable-body\n        [key]=\"key\"\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </datatable-body>\n      <datatable-footer\n        [key]=\"key\"\n        (onPageChange)=\"onPageChanged($event)\">\n      </datatable-footer>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [State_1.StateService, core_1.ElementRef, core_1.KeyValueDiffers])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=DataTable.js.map