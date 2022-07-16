import { WORD_LENGTH } from './config';

export class Row {
    SELECTORS = {
        ROW: 'row',
        CELL: 'cell',
    };

    private rowNumber;
    public row: HTMLDivElement | null = null;

    constructor(rowNumber: number) {
        this.rowNumber = rowNumber;
        this.init();
    }

    private init = () => {
        this.row = document.createElement('div');
        this.row.classList.add(this.SELECTORS.ROW, `row-${this.rowNumber}`);
    };

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
