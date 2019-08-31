import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'row-grouping-details-demo',
    template: `
    <div>
      <h3>
        Row Grouping
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/row-groupings-details.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        #myTable
        class="material expandable"
        [rows]="rows"
        [groupRowsBy]="'age'"
        [columnMode]="'force'"
        [scrollbarH]="true"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="40"
        [limit]="4"
        [groupExpansionDefault]="true"
      >

      <ngx-datatable-row-detail
        [rowHeight]="100"
        #myDetailRow
        (toggle)="onDetailToggle($event)"
      >
      <ng-template
        let-row="row"
        let-detailsExpanded="expanded"
        ngx-datatable-row-detail-template
      >
        <div style="padding-left:35px;">
          <div><strong>Name</strong></div>
          <div>{{ row.name }}</div>
        </div>
      </ng-template>
    </ngx-datatable-row-detail>

        <!-- Group Header Template -->
        <ngx-datatable-group-header
          [rowHeight]="50"
          #myGroupHeader
          (toggle)="onDetailToggle($event)"
        >
          <ng-template
            let-group="group"
            let-expanded="expanded"
            ngx-datatable-group-header-template
          >
            <div style="padding-left:5px;">
              <a
                href="#"
                [class.datatable-icon-right]="!expanded"
                [class.datatable-icon-down]="expanded"
                title="Expand/Collapse Group"
                (click)="toggleExpandGroup(group)"
              >
                <b>Age: {{ group.value[0].age }}</b>
              </a>
            </div>
          </ng-template>
        </ngx-datatable-group-header>

        <!-- Row Column Template -->
        <ngx-datatable-column
          [width]="50"
          [resizeable]="false"
          [sortable]="false"
          [draggable]="false"
          [canAutoResize]="false"
        >
          <ng-template
            let-row="row"
            let-expanded="expanded"
            ngx-datatable-cell-template
          >
            <a
              href="javascript:void(0)"
              [class.datatable-icon-right]="!expanded"
              [class.datatable-icon-down]="expanded"
              title="Expand/Collapse Row"
              (click)="toggleExpandRow(row)"
            >
            </a>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column
          name="Exp. Pay."
          prop=""
          editable="true"
        >
          <ng-template
            ngx-datatable-cell-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-row="row"
            let-group="group"
          >
            <input
              type="checkbox"
              id="ep1{{ rowIndex }}"
              name="{{ rowIndex }}"
              value="0"
              class="expectedpayment"
              (change)="checkGroup($event, row, rowIndex, group)"
              [checked]="row.exppayyes === 1"
            />
            <label for="ep1{{ rowIndex }}"></label>
            <input
              type="checkbox"
              id="ep2{{ rowIndex }}"
              name="{{ rowIndex }}"
              value="1"
              class="expectedpayment2"
              (change)="checkGroup($event, row, rowIndex, group)"
              [checked]="row.exppayno === 1"
            />
            <label for="ep2{{ rowIndex }}"></label>
            <input
              type="checkbox"
              id="ep3{{ rowIndex }}"
              name="{{ rowIndex }}"
              value="2"
              class="expectedpayment3"
              (change)="checkGroup($event, row, rowIndex, group)"
              [checked]="row.exppaypending === 1"
            />
            <label for="ep3{{ rowIndex }}"></label>
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column
          name="Source"
          prop="source"
          editable="false"
        ></ngx-datatable-column>
        <ngx-datatable-column
          name="Name"
          prop="name"
          editable="true"
        ></ngx-datatable-column>
        <ngx-datatable-column
          name="Gender"
          prop="gender"
        ></ngx-datatable-column>
        <ngx-datatable-column name="Age" prop="age"></ngx-datatable-column>
        <ngx-datatable-column name="Comment" prop="comment">
          <ng-template
            ngx-datatable-cell-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-row="row"
            let-group="group"
            let-rowHeight="rowHeight"
          >
            <input
              autofocus
              (blur)="updateValue($event, 'comment', rowIndex)"
              type="text"
              name="comment"
              [value]="value"
            />
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class RowGroupingDetailsComponent {
    @ViewChild('myTable', { static: false }) table: any;

    funder = [];
    calculated = [];
    pending = [];
    groups = [];

    editing = {};
    rows = [];

    constructor() {
        this.fetch(data => {
            this.rows = data;
        });
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/forRowGrouping.json`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    getGroupRowHeight(group, rowHeight) {
        let style = {};

        style = {
            height: group.length * 40 + 'px',
            width: '100%'
        };

        return style;
    }

    checkGroup(event, row, rowIndex, group) {
        let groupStatus: string = 'Pending';
        let expectedPaymentDealtWith: boolean = true;

        row.exppayyes = 0;
        row.exppayno = 0;
        row.exppaypending = 0;

        if (event.target.checked)
            if (event.target.value === '0') {
                // expected payment yes selected
                row.exppayyes = 1;
            } else if (event.target.value === '1') {
                // expected payment yes selected
                row.exppayno = 1;
            } else if (event.target.value === '2') {
                // expected payment yes selected
                row.exppaypending = 1;
            }

        if (group.length === 2) {
            // There are only 2 lines in a group
            // tslint:disable-next-line:max-line-length
            if (
                ['Calculated', 'Funder'].indexOf(group[0].source) > -1 &&
                ['Calculated', 'Funder'].indexOf(group[1].source) > -1
            ) {
                // Sources are funder and calculated
                // tslint:disable-next-line:max-line-length
                if (
                    group[0].startdate === group[1].startdate &&
                    group[0].enddate === group[1].enddate
                ) {
                    // Start dates and end dates match
                    for (let index = 0; index < group.length; index++) {
                        if (group[index].source !== row.source) {
                            if (event.target.value === '0') {
                                // expected payment yes selected
                                group[index].exppayyes = 0;
                                group[index].exppaypending = 0;
                                group[index].exppayno = 1;
                            }
                        }

                        if (
                            group[index].exppayyes === 0 &&
                            group[index].exppayno === 0 &&
                            group[index].exppaypending === 0
                        ) {
                            expectedPaymentDealtWith = false;
                        }
                        console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
                    }
                }
            }
        } else {
            for (let index = 0; index < group.length; index++) {
                if (
                    group[index].exppayyes === 0 &&
                    group[index].exppayno === 0 &&
                    group[index].exppaypending === 0
                ) {
                    expectedPaymentDealtWith = false;
                }
                console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
            }
        }

        // check if there is a pending selected payment or a row that does not have any expected payment selected
        if (
            group.filter(rowFilter => rowFilter.exppaypending === 1).length === 0 &&
            group.filter(
                rowFilter =>
                    rowFilter.exppaypending === 0 &&
                    rowFilter.exppayyes === 0 &&
                    rowFilter.exppayno === 0
            ).length === 0
        ) {
            console.log('expected payment dealt with');

            // check if can set the group status
            const numberOfExpPayYes = group.filter(
                rowFilter => rowFilter.exppayyes === 1
            ).length;
            const numberOfSourceFunder = group.filter(
                rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Funder'
            ).length;
            const numberOfSourceCalculated = group.filter(
                rowFilter =>
                    rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated'
            ).length;
            const numberOfSourceManual = group.filter(
                rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Manual'
            ).length;

            console.log('numberOfExpPayYes', numberOfExpPayYes);
            console.log('numberOfSourceFunder', numberOfSourceFunder);
            console.log('numberOfSourceCalculated', numberOfSourceCalculated);
            console.log('numberOfSourceManual', numberOfSourceManual);

            if (numberOfExpPayYes > 0) {
                if (numberOfExpPayYes === numberOfSourceFunder) {
                    groupStatus = 'Funder Selected';
                } else if (numberOfExpPayYes === numberOfSourceCalculated) {
                    groupStatus = 'Calculated Selected';
                } else if (numberOfExpPayYes === numberOfSourceManual) {
                    groupStatus = 'Manual Selected';
                } else {
                    groupStatus = 'Hybrid Selected';
                }
            }
        }

        group[0].groupstatus = groupStatus;
    }

    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
    }

    toggleExpandGroup(group) {
        console.log('Toggled Expand Group!', group);
        this.table.groupHeader.toggleExpandGroup(group);
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }


    onDetailToggle(event) {
        console.log('Detail Toggled', event);
    }
}
