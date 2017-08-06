import { Component } from '@angular/core';

@Component({
  selector: 'client-paging-demo',
  template: `
    <div>
      <h3>
        Client-side Paging
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [groupRowsBy]="'age'"
        [columns]="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"        
        [rowHeight]="'auto'"
        [limit]="3"
        >
      </ngx-datatable>
    </div>
  `
})
export class ClientPagingComponent {

/*
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [limit]="10"
*/

  rows = [];
  
  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    //req.open('GET', `assets/data/company.json`);
    req.open('GET', `assets/data/forRowGrouping.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
