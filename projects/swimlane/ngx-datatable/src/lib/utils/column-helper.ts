import { camelCase, deCamelCase } from './camel-case';
import { id } from './id';
import { getterForProp } from './column-prop-getters';
import { TableColumn } from '../types/table-column.type';
import { DataTableColumnDirective } from '../components/columns/column.directive';

/**
 * Sets the column defaults
 */
export function setColumnDefaults(columns: TableColumn[]) {
  if (!columns) return;

  // Only one column should hold the tree view
  // Thus if multiple columns are provided with
  // isTreeColumn as true we take only the first one
  let treeColumnFound: boolean = false;

  for (const column of columns) {
    if (!column.$$id) {
      column.$$id = id();
    }

    // prop can be numeric; zero is valid not a missing prop
    // translate name => prop
    if (isNullOrUndefined(column.prop) && column.name) {
      column.prop = camelCase(column.name);
    }

    if (!column.$$valueGetter) {
      column.$$valueGetter = getterForProp(column.prop);
    }

    // format props if no name passed
    if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
      column.name = deCamelCase(String(column.prop));
    }

    if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
      column.name = ''; // Fixes IE and Edge displaying `null`
    }

    if (!column.hasOwnProperty('resizeable')) {
      column.resizeable = true;
    }

    if (!column.hasOwnProperty('sortable')) {
      column.sortable = true;
    }

    if (!column.hasOwnProperty('draggable')) {
      column.draggable = true;
    }

    if (!column.hasOwnProperty('canAutoResize')) {
      column.canAutoResize = true;
    }

    if (!column.hasOwnProperty('width')) {
      column.width = 150;
    }

    if (!column.hasOwnProperty('isTreeColumn')) {
      column.isTreeColumn = false;
    } else {
      if (column.isTreeColumn && !treeColumnFound) {
        // If the first column with isTreeColumn is true found
        // we mark that treeCoulmn is found
        treeColumnFound = true;
      } else {
        // After that isTreeColumn property for any other column
        // will be set as false
        column.isTreeColumn = false;
      }
    }
  }
}

export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Translates templates definitions to objects
 */
export function translateTemplates(templates: DataTableColumnDirective[]): any[] {
  const result: any[] = [];
  for (const temp of templates) {
    const col: any = {};

    const props = Object.getOwnPropertyNames(temp);
    for (const prop of props) {
      col[prop] = temp[prop];
    }

    if (temp.headerTemplate) {
      col.headerTemplate = temp.headerTemplate;
    }

    if (temp.cellTemplate) {
      col.cellTemplate = temp.cellTemplate;
    }
    
    if (temp.treeToggleTemplate) {
      col.treeToggleTemplate = temp.treeToggleTemplate;
    }

    if (temp.summaryFunc) {
      col.summaryFunc = temp.summaryFunc;
    }

    if (temp.summaryTemplate) {
      col.summaryTemplate = temp.summaryTemplate;
    }

    result.push(col);
  }

  return result;
}
