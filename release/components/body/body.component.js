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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var scroller_component_1 = require("./scroller.component");
var DataTableBodyComponent = /** @class */ (function () {
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    function DataTableBodyComponent(cd) {
        var _this = this;
        this.cd = cd;
        this.selected = [];
        this.scroll = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.treeAction = new core_1.EventEmitter();
        this.rowHeightsCache = new utils_1.RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        this.rowIndexes = new Map();
        this.rowExpansions = new Map();
        /**
         * Get the height of the detail row.
         */
        this.getDetailRowHeight = function (row, index) {
            if (!_this.rowDetail)
                return 0;
            var rowHeight = _this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
        };
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            var idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return idx + "-" + this.trackByProp;
            }
            else {
                return idx;
            }
        }.bind(this);
    }
    Object.defineProperty(DataTableBodyComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (val) {
            this._pageSize = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.rowExpansions.clear();
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (val) {
            this._offset = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rowCount", {
        get: function () {
            return this._rowCount;
        },
        set: function (val) {
            this._rowCount = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyHeight", {
        get: function () {
            return this._bodyHeight;
        },
        set: function (val) {
            if (this.scrollbarV) {
                this._bodyHeight = val + 'px';
            }
            else {
                this._bodyHeight = 'auto';
            }
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        /**
         * Returns if selection is enabled.
         */
        get: function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll and virtualization. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         */
        get: function () {
            if (this.scrollbarV && this.virtualization && this.rowCount) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
            // avoid TS7030: Not all code paths return a value.
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after the constructor, initializing input properties
     */
    DataTableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'group')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
    };
    /**
     * Called once, before the instance is destroyed.
     */
    DataTableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.rowDetail)
            this.listener.unsubscribe();
        if (this.groupHeader)
            this.listener.unsubscribe();
    };
    /**
     * Updates the Y offset given a new offset.
     */
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offset = 0;
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     */
    DataTableBodyComponent.prototype.onBodyScroll = function (event) {
        var scrollYPos = event.scrollYPos;
        var scrollXPos = event.scrollXPos;
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
    };
    /**
     * Updates the page given a direction.
     */
    DataTableBodyComponent.prototype.updatePage = function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.floor(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     */
    DataTableBodyComponent.prototype.updateRows = function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            var maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                var group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                var row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    };
    /**
     * Get the row height
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return this.rowHeight;
    };
    /**
     * @param group the group with all rows
     */
    DataTableBodyComponent.prototype.getGroupHeight = function (group) {
        var rowHeight = 0;
        if (group.value) {
            for (var index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = function (row) {
        var rowHeight = this.getRowHeight(row);
        var expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
    };
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
    DataTableBodyComponent.prototype.getRowsStyles = function (rows) {
        var styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles['width'] = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            var idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                var row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getBottomSummaryRowStyles = function () {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        var styles = { position: 'absolute' };
        var pos = this.rowHeightsCache.query(this.rows.length - 1);
        utils_1.translateXY(styles, 0, pos);
        return styles;
    };
    /**
     * Hides the loading indicator
     */
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    /**
     * Updates the index of the rows in the viewport
     */
    DataTableBodyComponent.prototype.updateIndexes = function () {
        var first = 0;
        var last = 0;
        if (this.scrollbarV) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                var height = parseInt(this.bodyHeight, 0);
                first = this.rowHeightsCache.getRowIndex(this.offsetY);
                last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
            }
            else {
                // If virtual rows are not needed
                // We render all in one go
                first = 0;
                last = this.rowCount;
            }
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV || (this.scrollbarV && !this.virtualization))
            return;
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
    };
    /**
     * Gets the index for the view port
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        var expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            var detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            var idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
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
    };
    /**
     * Recalculates the table
     */
    DataTableBodyComponent.prototype.recalcLayout = function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    /**
     * Tracks the column
     */
    DataTableBodyComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    /**
     * Gets the row pinning group styles
     */
    DataTableBodyComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = offsetDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    DataTableBodyComponent.prototype.getRowExpanded = function (row) {
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            for (var _i = 0, _a = this.groupedRows; _i < _a.length; _i++) {
                var group = _a[_i];
                this.rowExpansions.set(group, 1);
            }
        }
        var expanded = this.rowExpansions.get(row);
        return expanded === 1;
    };
    /**
     * Gets the row index given a row
     */
    DataTableBodyComponent.prototype.getRowIndex = function (row) {
        return this.rowIndexes.get(row) || 0;
    };
    DataTableBodyComponent.prototype.onTreeAction = function (row) {
        this.treeAction.emit({ row: row });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "externalPaging", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "displayCheck", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "trackByProp", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupedRows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "groupExpansionDefault", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "innerWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "groupRowsBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "virtualization", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "summaryRow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "summaryPosition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "summaryHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "pageSize", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableBodyComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], DataTableBodyComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "offset", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "rowCount", null);
    __decorate([
        core_1.HostBinding('style.width'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], DataTableBodyComponent.prototype, "bodyWidth", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('style.height'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DataTableBodyComponent.prototype, "bodyHeight", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "detailToggle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowContextmenu", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "treeAction", void 0);
    __decorate([
        core_1.ViewChild(scroller_component_1.ScrollerComponent),
        __metadata("design:type", scroller_component_1.ScrollerComponent)
    ], DataTableBodyComponent.prototype, "scroller", void 0);
    DataTableBodyComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <datatable-selection\n      #selector\n      [selected]=\"selected\"\n      [rows]=\"rows\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows?.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths?.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'top'\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\">\n        </datatable-summary-row>\n        <datatable-row-wrapper\n          [groupedRows]=\"groupedRows\"\n          *ngFor=\"let group of temp; let i = index; trackBy: rowTrackingFn;\"\n          [innerWidth]=\"innerWidth\"\n          [ngStyle]=\"getRowsStyles(group)\"\n          [rowDetail]=\"groupedRows ? null : rowDetail\"\n          [groupHeader]=\"groupHeader\"\n          [offsetX]=\"offsetX\"\n          [detailRowHeight]=\"getDetailRowHeight(group[i],i)\"\n          [row]=\"group\"\n          [expanded]=\"getRowExpanded(group)\"\n          [rowIndex]=\"getRowIndex(group[i])\"\n          (rowContextmenu)=\"rowContextmenu.emit($event)\">\n          <datatable-body-row\n            *ngIf=\"!groupedRows; else groupedRowsTemplate\"\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(group)\"\n            [innerWidth]=\"innerWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"getRowHeight(group)\"\n            [row]=\"group\"\n            [rowIndex]=\"getRowIndex(group)\"\n            [expanded]=\"getRowExpanded(group)\"\n            [rowClass]=\"rowClass\"\n            [displayCheck]=\"displayCheck\"\n            [treeStatus]=\"group.treeStatus\"\n            (treeAction)=\"onTreeAction(group)\"\n            (activate)=\"selector.onActivate($event, indexes.first + i)\">\n          </datatable-body-row>\n          <ng-template #groupedRowsTemplate>\n            <datatable-row-wrapper\n              *ngFor=\"let row of group.value; let i = index; trackBy: rowTrackingFn;\"\n              [innerWidth]=\"innerWidth\"\n              [rowDetail]=\"rowDetail\"\n              [offsetX]=\"offsetX\"\n              [detailRowHeight]=\"getDetailRowHeight(group[i],i)\"\n              [row]=\"row\"\n              [expanded]=\"getRowExpanded(row)\"\n              [rowIndex]=\"getRowIndex(row[i])\"\n              (rowContextmenu)=\"rowContextmenu.emit($event)\">\n              <datatable-body-row\n                tabindex=\"-1\"\n                [isSelected]=\"selector.getRowSelected(row)\"\n                [innerWidth]=\"innerWidth\"\n                [offsetX]=\"offsetX\"\n                [columns]=\"columns\"\n                [rowHeight]=\"getRowHeight(row)\"\n                [row]=\"row\"\n                [group]=\"group.value\"\n                [rowIndex]=\"getRowIndex(row)\"\n                [expanded]=\"getRowExpanded(row)\"\n                [rowClass]=\"rowClass\"\n                (activate)=\"selector.onActivate($event, i)\">\n              </datatable-body-row>\n            </datatable-row-wrapper>\n          </ng-template>\n        </datatable-row-wrapper>\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'bottom'\"\n          [ngStyle]=\"getBottomSummaryRowStyles()\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\">\n        </datatable-summary-row>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows?.length && !loadingIndicator\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            host: {
                class: 'datatable-body'
            }
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}());
exports.DataTableBodyComponent = DataTableBodyComponent;
//# sourceMappingURL=body.component.js.map