import './app.scss';
import Grid from './Grid';
import words from './words';
import { showRules } from './Rules';

const MAX_WORD_LENGTH = 5;
const MAX_TRIES = 5;
const randomIndex = Math.floor(Math.random() * words.length);
let wordToBeGuessed = words[randomIndex];
console.log('wordToBeGuessed', wordToBeGuessed);
let currentRowIndex = 0;

function getRandomWordFromList() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function isCurrentRowFull(wordOnCurrentRow: string) {
    return wordOnCurrentRow.length === MAX_WORD_LENGTH;
}

function wordHasBeenGuessed(wordOnCurrentRow: string) {
    return wordOnCurrentRow.toLowerCase() === wordToBeGuessed.toLowerCase();
}

function anyRowsLeft() {
    return currentRowIndex < MAX_TRIES - 1;
}

function getCurrentCell(wordOnCurrentRow: string) {
    return document.querySelector(
        `.cell-${currentRowIndex}-${wordOnCurrentRow.length}`
    );
}

function inputIsValidLetter(input: string) {
    return /[a-zA-Z]/.test(input);
}

function keyIsAlreadyUsed(key: string) {
    return document.querySelector(`.${key}`).classList.contains('used');
}

function addEventListeners() {
    document.addEventListener('keyup', function (e) {
        if (!inputIsValidLetter(e.key)) return;

        if (keyIsAlreadyUsed(e.key)) return;

        const cellsOnCurrentRow: NodeListOf<HTMLDivElement> =
            document.querySelectorAll(`.row-${currentRowIndex} .cell`);

        let wordOnCurrentRow = Array.from(cellsOnCurrentRow).reduce(
            (acc, cur) => (acc += cur.innerText),
            ''
        );

        const currentCell: HTMLDivElement =
            Array.from(cellsOnCurrentRow)[wordOnCurrentRow.length];
        currentCell.classList.add('currentCell');
        currentCell.innerText = e.key.toUpperCase();
        wordOnCurrentRow += e.key;

        if (!isCurrentRowFull(wordOnCurrentRow)) {
            return;
        }

        //   word has been correctly guessed
        if (wordHasBeenGuessed(wordOnCurrentRow)) {
            handleWin();
            colorCells();
            return;
        }

        colorCells();

        disableKeys();

        //   move to next row, if any rows are left
        if (anyRowsLeft) {
            currentRowIndex++;
        }
    });
}

function disableKeys() {
    const allKeys = document.querySelectorAll('.key');
    const usedKeyNodes = document.querySelectorAll('.cell');
    const usedKeys = Array.from(usedKeyNodes)
        .map((cell: HTMLDivElement) => cell.innerText.toLowerCase())
        .filter((cell) => cell !== '');

    allKeys.forEach((key: HTMLDivElement) => {
        if (
            usedKeys.includes(key.innerText.toLowerCase()) &&
            !wordToBeGuessed.includes(key.innerText.toLowerCase())
        ) {
            key.classList.add('used');
        }
    });
}

function colorCells() {
    const cells: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        `.row-${currentRowIndex} .cell`
    );

    cells.forEach((cell, idx) => {
        const letter = cell.innerText.toLowerCase();
        if (letter === wordToBeGuessed[idx]) {
            cell.classList.add('exactMatch');
        } else if (wordToBeGuessed.indexOf(letter) !== -1) {
            cell.classList.add('match');
        } else {
            cell.classList.add('noMatch');
        }

        cell.setAttribute('disabled', 'true');
    });
}

function handleWin() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.setAttribute('disabled', 'true');
    });
}

function initGame() {
    if (!localStorage.getItem('rulesWereRead')) {
        showRules();
    }
    new Grid();
    addEventListeners();
}

initGame();
