import { WORD_LENGTH } from './constants.js';

export class Row {
  constructor(rowNumber) {
    this.rowNumber = rowNumber;
    this.row = null;
  }

  create() {
    let row = document.createElement('div');
    row.classList.add('row', `row-${this.rowNumber}`);

    this.row = row;
  }

  createCells() {
    for (let cellNumber = 0; cellNumber < WORD_LENGTH; cellNumber++) {
      const cell = document.createElement('div');
      cell.classList.add(
        'cell',
        `cell-${this.rowNumber}`,
        `cell-${this.rowNumber}-${cellNumber}`
      );

      this.row.appendChild(cell);
    }
  }

  addToGrid() {
    const grid = document.getElementById('grid');
    grid.appendChild(this.row);
  }
}
