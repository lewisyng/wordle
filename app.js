import { createGrid } from './src/grid.js';
import words from './src/words.js';

const MAX_WORD_LENGTH = 5;
const MAX_TRIES = 5;
// let wordToBeGuessed = getRandomWordFromList();
let wordToBeGuessed = 'hello';
let currentRowIndex = 0;

function getRandomWordFromList() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function isCurrentRowFull(wordOnCurrentRow) {
  return wordOnCurrentRow.length === MAX_WORD_LENGTH;
}

function focusCell(idx) {
  document
    .querySelector(`.cell-${currentRowIndex}-${idx}`)
    .focus();
}

function wordHasBeenGuessed(wordOnCurrentRow) {
  return wordOnCurrentRow === wordToBeGuessed;
}

function anyRowsLeft() {
  return currentRowIndex < MAX_TRIES - 1;
}

let wordOnCurrentRow = '';

function addEventListeners() {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('keyup', function (e) {
      wordOnCurrentRow += e.target.value;

      //   if row isn't full, only move to next cell
      if (!isCurrentRowFull(wordOnCurrentRow)) {
        focusCell(wordOnCurrentRow.length);
        return;
      }

      //   word has been correctly guessed
      if (wordHasBeenGuessed(wordOnCurrentRow)) {
        handleWin();
        return;
      }

      //   word hasn't been guessed yet, but row is full
      //   color the cells
      const cells = document.querySelectorAll(`.cell-${currentRowIndex}`);

      cells.forEach((cell, idx) => {
        if (cell.value === wordToBeGuessed[idx]) {
          cell.classList.add('exactMatch');
        } else if (wordToBeGuessed.indexOf(cell.value) !== -1) {
          cell.classList.add('match');
        } else {
          cell.classList.add('noMatch');
        }

        cell.setAttribute('disabled', true);
      });

      //   move focus to next row, if any rows are left
      if (anyRowsLeft) {
        currentRowIndex++;
        wordOnCurrentRow = '';

        focusCell(0);
      }
    });
  });
}

function handleWin() {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.setAttribute('disabled', 'true');
  });
  console.log('YOU WON');
}

function focusFirstCell() {
  const firstCell = document.querySelector('.cell-0-0');
  firstCell.focus();
}

function initGame() {
  createGrid();
  focusFirstCell();
  addEventListeners();
}

initGame();
