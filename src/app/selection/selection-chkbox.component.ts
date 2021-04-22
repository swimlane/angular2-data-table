import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'chkbox-selection-demo',
  template: `
    <div>
      <h3>
        Checkbox Selection
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-chkbox.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
        <small>
          <a href="javascript:void(0)" (click)="add()">Add</a> |
          <a href="javascript:void(0)" (click)="update()">Update</a> |
          <a href="javascript:void(0)" (click)="remove()">Remove</a>
        </small>
      </h3>
      <div style="float:left;width:75%">
        <ngx-datatable
          style="width: 90%"
          class="material"
          [rows]="rows"
          [columnMode]="ColumnMode.force"
          [headerHeight]="50"
          [footerHeight]="50"
          rowHeight="auto"
          [limit]="5"
          [selected]="selected"
          [selectionType]="SelectionType.checkbox"
          [selectAllRowsOnPage]="false"
          [displayCheck]="displayCheck"
          [selectCheck]="displayCheck"
          (activate)="onActivate($event)"
          (select)="onSelect($event)"
        >
          <ngx-datatable-column
            [width]="30"
            [sortable]="false"
            [canAutoResize]="false"
            [draggable]="false"
            [resizeable]="false"
            [headerCheckboxable]="true"
            [checkboxable]="true"
          >
          </ngx-datatable-column>
          <ngx-datatable-column name="Name"></ngx-datatable-column>
          <ngx-datatable-column name="Gender"></ngx-datatable-column>
          <ngx-datatable-column name="Company"></ngx-datatable-column>
        </ngx-datatable>
      </div>

      <div class="selected-column">
        <h4>
          Selections <small>({{ selected?.length }})</small>
        </h4>
        <ul>
          <li *ngFor="let sel of selected">
            {{ sel.name }}
          </li>
          <li *ngIf="!selected?.length">No Selections</li>
        </ul>
      </div>
    </div>
  `
})
export class CheckboxSelectionComponent {
  rows = [];
  selected = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }
}
