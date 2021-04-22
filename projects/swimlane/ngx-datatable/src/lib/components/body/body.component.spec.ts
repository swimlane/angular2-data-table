import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DataTableBodyComponent } from './body.component';
import { DataTableBodyRowComponent } from './body-row.component';
import { DataTableRowWrapperComponent } from './body-row-wrapper.component';
import { DataTableBodyCellComponent } from './body-cell.component';
import { DataTableSelectionComponent } from './selection.component';
import { DataTableSummaryRowComponent } from './summary/summary-row.component';
import { ProgressBarComponent } from './progress-bar.component';
import { ScrollerComponent } from './scroller.component';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';

describe('DataTableBodyComponent', () => {
  let fixture: ComponentFixture<DataTableBodyComponent>;
  let component: DataTableBodyComponent;
  let element: any;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableBodyComponent,
        DataTableBodyRowComponent,
        DataTableRowWrapperComponent,
        DataTableBodyCellComponent,
        DataTableSelectionComponent,
        DataTableSummaryRowComponent,
        ProgressBarComponent,
        ScrollerComponent
      ],
      providers: [ScrollbarHelper]
    });
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(DataTableBodyComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
    })
  );

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Paging', () => {
    it('should have correct indexes for normal paging with rows > pageSize', () => {
      component.externalPaging = false;
      component.rows = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 }
      ];
      component.pageSize = 10;
      component.offset = 1;
      component.rowCount = 20;
      const expectedIndexes = { first: 10, last: 20 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for normal paging with rows < pageSize', () => {
      component.externalPaging = false;
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      component.pageSize = 5;
      component.offset = 1;
      component.rowCount = 9;
      const expectedIndexes = { first: 5, last: 9 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows > pageSize', () => {
      component.externalPaging = true;
      component.rows = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 }
      ];
      component.pageSize = 10;
      component.offset = 1;
      component.rowCount = 20;
      const expectedIndexes = { first: 0, last: 10 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows < pageSize', () => {
      component.externalPaging = true;
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      component.pageSize = 5;
      component.offset = 1;
      component.rowCount = 9;
      const expectedIndexes = { first: 0, last: 5 };
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });
  });

  describe('Summary row', () => {
    it('should not return custom styles for a bottom summary row if a scrollbar mode is off', () => {
      const styles = component.getBottomSummaryRowStyles();
      expect(styles).toBeFalsy();
    });

    it('should return custom styles for a bottom summary row if a scrollbar mode is on', () => {
      component.rowHeight = 50;
      component.scrollbarV = true;
      component.virtualization = true;
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      const styles = component.getBottomSummaryRowStyles();
      expect(styles).toBeDefined();
    });
  });

  describe('Row Grouping', () => {
    it('should all group have collapsed state when all group are collapsed by user', () => {
      component.groupExpansionDefault = true;
      const rows = [
        { name: 'Schroeder Mathews', gender: 'male', company: 'Polarium', age: 67 },
        { name: 'Lynda Mendoza', gender: 'female', company: 'Dogspa', age: 10 }
      ];
      const [firstRow, secondRow] = rows;
      component.rows = [...rows];
      component.groupRowsBy = 'age';
      component.rowIdentity = (x: any) => {
        if (component.groupRowsBy) {
          // each group in groupedRows are stored as {key, value: [rows]},
          // where key is the groupRowsBy index
          return x.key;
        } else {
          return x;
        }
      };
      component.toggleRowExpansion(firstRow);
      component.toggleRowExpansion(secondRow);
      expect(component.isAllGroupCollapsed).toEqual(true);
    });
  });
});
