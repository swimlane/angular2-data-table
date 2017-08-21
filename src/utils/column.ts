/**
 * Returns the columns by pin.
 */
export function columnsByPin(cols: any[]) {
  const ret: {left: any, center: any, grouping: any, right: any} = {
    left: [],
    center: [],
    grouping: [],
    right: []
  };

  if(cols) {
    for(const col of cols) {
      //if the column is part of a group it will be treated once per group, rathern than once per row.
      if(!col.isGroup) {
        if(col.frozenLeft) {
          ret.left.push(col);
        } else if(col.frozenRight) {
          ret.right.push(col);
        } else {
          ret.center.push(col);
        }
      }
      else{
        ret.center.push(col);
      }
        
    }
  }

  return ret;
}

/**
 * Returns the widths of all group sets of a column
 */
export function columnGroupWidths(groups: any, all: any) {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: columnTotalWidth(all)
  };
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnTotalWidth(columns: any[], prop?: string) {
  let totalWidth = 0;

  if(columns) {
    for(const c of columns) {
      const has = prop && c[prop];
      const width = has ? c[prop] : c.width;
      totalWidth = totalWidth + parseFloat(width);
    }
  }

  return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnsTotalWidth(columns: any, prop?: any) {
  let totalWidth = 0;

  for(const column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? column[prop] : column.width);
  }

  return totalWidth;
}

export function columnsByPinArr(val: any) {
  const colsByPinArr = [];
  const colsByPin = columnsByPin(val);

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}

export function allColumnsByPinArr(val: any) {
  const colsByPinArr = [];
  const colsByPin = columnsByPin(val);
  const colsTest = [];

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
  colsByPinArr.push({ type: 'grouping', columns: colsByPin['grouping'] });  
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}

export function groupColumnsArr(val: any) {
  return columnsByPin(val)['grouping'];
}
