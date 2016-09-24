import { columnsByPin } from './column';

/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} property width to get
 */
export function columnTotalWidth(columns: any, prop?: any) {
  let totalWidth = 0;

  for(let column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? +column[prop] : +column.width);
  }

  return totalWidth;
}

/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
export function getTotalFlexGrow(columns) {
  let totalFlexGrow = 0;

  for (let c of columns) {
    totalFlexGrow += c.flexGrow || 0;
  }

  return totalFlexGrow;
}

/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
export function adjustColumnWidths(allColumns: any, expectedWidth: any) {
  let columnsWidth = columnTotalWidth(allColumns);
  let totalFlexGrow = getTotalFlexGrow(allColumns);
  let colsByGroup = columnsByPin(allColumns);

  if (columnsWidth !== expectedWidth) {
    scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
  }
}

/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {array} colsByGroup
 * @param {int} maxWidth
 * @param {int} totalFlexGrow
 */
function scaleColumns(colsByGroup: any, maxWidth: any, totalFlexGrow: any) {
  // calculate total width and flexgrow points for coulumns that can be resized
  for(let attr in colsByGroup) {
    for(let column of colsByGroup[attr]) {
      if (!column.canAutoResize) {
        maxWidth -= +column.width;
        totalFlexGrow -= +column.flexGrow;
      } else {
        column.width = 0;
      }
    }
  }

  let hasMinWidth = {};
  let remainingWidth = maxWidth;

  // resize columns until no width is left to be distributed
  do {
    let widthPerFlexPoint = remainingWidth / totalFlexGrow;
    remainingWidth = 0;

    for(let attr in colsByGroup) {
      for(let column of colsByGroup[attr]) {
        // if the column can be resize and it hasn't reached its minimum width yet
        if (column.canAutoResize && !hasMinWidth[column.prop]) {
          let newWidth = +column.width + +column.flexGrow * widthPerFlexPoint;
          if (column.minWidth !== undefined && newWidth < column.minWidth) {
            remainingWidth += newWidth - +column.minWidth;
            column.width = +column.minWidth;
            hasMinWidth[column.prop] = true;
          } else {
            column.width = newWidth;
          }
        }
      }
    }
  } while (remainingWidth !== 0);
}

/**
 * Forces the width of the columns to
 * distribute equally but overflowing when nesc.
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proporation the widths given the min / max / noraml widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proporational widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the orginial width; not the newly proporatied widths.
 *
 * @param {array} allColumns
 * @param {int} expectedWidth
 */
export function forceFillColumnWidths(allColumns: any, expectedWidth: any, startIdx: any) {
  let contentWidth = 0;

  let columnsToResize = startIdx > -1 ?
    allColumns.slice(startIdx, allColumns.length).filter((c) => { return c.canAutoResize; }) :
    allColumns.filter((c) => { return c.canAutoResize; });

  for(let column of allColumns) {
    if(!column.canAutoResize) {
      contentWidth += +column.width;
    } else {
      contentWidth += (+column.$$oldWidth || +column.width);
    }
  }

  let remainingWidth = +expectedWidth - contentWidth;
  let additionWidthPerColumn = remainingWidth / columnsToResize.length;
  let exceedsWindow = contentWidth > expectedWidth;

  for(let column of columnsToResize) {
    if(exceedsWindow) {
      column.width = +column.$$oldWidth || +column.width;
    } else {
      if(!column.$$oldWidth) {
        column.$$oldWidth = +column.width;
      }

      const newSize = column.$$oldWidth + additionWidthPerColumn;
      if(column.minWith && newSize < +column.minWidth) {
        column.width = +column.minWidth;
      } else if(column.maxWidth && newSize > +column.maxWidth) {
        column.width = +column.maxWidth;
      } else {
        column.width = +newSize;
      }
    }
  }
}
