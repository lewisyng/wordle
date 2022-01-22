import { ROW_COUNT } from './constants.js';
import { Row } from './Row.js';

export function createGrid() {
  for (let rowNumber = 0; rowNumber < ROW_COUNT; rowNumber++) {
    const row = new Row(rowNumber);
    row.create();
    row.createCells();
    row.addToGrid();
  }
}
