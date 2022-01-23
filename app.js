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
  document.querySelector(`.cell-${currentRowIndex}-${idx}`).focus();
}

function wordHasBeenGuessed(wordOnCurrentRow) {
  return wordOnCurrentRow === wordToBeGuessed;
}

function anyRowsLeft() {
  return currentRowIndex < MAX_TRIES - 1;
}

function getCurrentCell(wordOnCurrentRow) {
  return document.querySelector(
    `.cell-${currentRowIndex}-${wordOnCurrentRow.length}`
  );
}

function addEventListeners() {
  document.addEventListener('keyup', function (e) {
    // check if input is a letter
    if (e.key.length !== 1 || !/[a-zA-Z]/.test(e.key)) {
      return;
    }

    const cellsOnCurrentRow = document.querySelectorAll(
      `.cell-${currentRowIndex}`
    );
    
    let wordOnCurrentRow = '';

    cellsOnCurrentRow.forEach((cell) => {
      wordOnCurrentRow += cell.innerText;
    });

    const currentCell = getCurrentCell(wordOnCurrentRow);

    currentCell.classList.add('currentCell');
    currentCell.innerText = e.key.toUpperCase();
    wordOnCurrentRow += e.key;

    if (!isCurrentRowFull(wordOnCurrentRow)) {
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
      if (cell.innerText === wordToBeGuessed[idx]) {
        cell.classList.add('exactMatch');
      } else if (wordToBeGuessed.indexOf(cell.innerText) !== -1) {
        cell.classList.add('match');
      } else {
        cell.classList.add('noMatch');
      }

      cell.setAttribute('disabled', true);
    });

    //   move to next row, if any rows are left
    if (anyRowsLeft) {
      currentRowIndex++;
    }
  });
}

function handleWin() {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.setAttribute('disabled', 'true');
  });
  console.log('YOU WON');
}

function initGame() {
  createGrid();
  addEventListeners();
}

initGame();
