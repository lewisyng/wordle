import { ROW_COUNT, WORD_LENGTH } from './config';
import { Row } from './Row';

class Grid {
    private static SELECTORS = {
        GRID: '#grid',
    };

    private grid?: HTMLDivElement | null;

    constructor() {
        this.bind();
        this.initGrid();
        this.readDataFromCells();
    }

    private bind() {
        this.grid = document.querySelector(Grid.SELECTORS.GRID);
    }

    private initGrid = () => {
        this.createRows();
    };

    private createRows = () => {
        for (let i = 0; i < ROW_COUNT; i++) {
            const row = new Row(i);

            if (row.row) {
                this.grid.appendChild(row.row);
                this.createCells(row.row, i);
            }
        }
    };

    private createCells = (row: HTMLDivElement, idx: number) => {
        for (let j = 0; j < WORD_LENGTH; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', `cell-${j}`, `cell-${idx}-${j}`);

            row.appendChild(cell);
        }
    };

    private readDataFromCells = () => {};
}

export default Grid;
