/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Row.js":
/*!********************!*\
  !*** ./src/Row.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Row\": () => (/* binding */ Row)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n\r\n\r\nclass Row {\r\n    CLASSNAMES = {\r\n        ROW: 'row',\r\n        CELL: 'cell',\r\n    };\r\n\r\n    rowNumber;\r\n    row;\r\n\r\n    constructor(rowNumber) {\r\n        this.rowNumber = rowNumber;\r\n        this.row = null;\r\n    }\r\n\r\n    create() {\r\n        let row = document.createElement('div');\r\n        row.classList.add(this.CLASSNAMES.ROW, `row-${this.rowNumber}`);\r\n\r\n        this.row = row;\r\n    }\r\n\r\n    createCells() {\r\n        for (let cellNumber = 0; cellNumber < _constants_js__WEBPACK_IMPORTED_MODULE_0__.WORD_LENGTH; cellNumber++) {\r\n            const cell = document.createElement('div');\r\n            cell.classList.add(\r\n                'cell',\r\n                `cell-${this.rowNumber}`,\r\n                `cell-${this.rowNumber}-${cellNumber}`\r\n            );\r\n\r\n            this.row.appendChild(cell);\r\n        }\r\n    }\r\n\r\n    addToGrid() {\r\n        const grid = document.getElementById('grid');\r\n        grid.appendChild(this.row);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://wordle/./src/Row.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid.js */ \"./src/grid.js\");\n/* harmony import */ var _words_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./words.js */ \"./src/words.js\");\n\r\n\r\n\r\nconst MAX_WORD_LENGTH = 5;\r\nconst MAX_TRIES = 5;\r\n// let wordToBeGuessed = getRandomWordFromList();\r\nlet wordToBeGuessed = 'HELLO';\r\nlet currentRowIndex = 0;\r\n\r\nfunction getRandomWordFromList() {\r\n  const randomIndex = Math.floor(Math.random() * _words_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].length);\r\n  return _words_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"][randomIndex];\r\n}\r\n\r\nfunction isCurrentRowFull(wordOnCurrentRow) {\r\n  return wordOnCurrentRow.length === MAX_WORD_LENGTH;\r\n}\r\n\r\nfunction focusCell(idx) {\r\n  document.querySelector(`.cell-${currentRowIndex}-${idx}`).focus();\r\n}\r\n\r\nfunction wordHasBeenGuessed(wordOnCurrentRow) {\r\n    console.log(\"wordOnCurrentRow: \", wordOnCurrentRow);\r\n  return wordOnCurrentRow === wordToBeGuessed;\r\n}\r\n\r\nfunction anyRowsLeft() {\r\n  return currentRowIndex < MAX_TRIES - 1;\r\n}\r\n\r\nfunction getCurrentCell(wordOnCurrentRow) {\r\n  return document.querySelector(\r\n    `.cell-${currentRowIndex}-${wordOnCurrentRow.length}`\r\n  );\r\n}\r\n\r\nfunction addEventListeners() {\r\n  document.addEventListener('keyup', function (e) {\r\n    // check if input is a letter\r\n    if (e.key.length !== 1 || !/[a-zA-Z]/.test(e.key)) {\r\n      return;\r\n    }\r\n\r\n    const cellsOnCurrentRow = document.querySelectorAll(\r\n      `.cell-${currentRowIndex}`\r\n    );\r\n    \r\n    let wordOnCurrentRow = '';\r\n\r\n    cellsOnCurrentRow.forEach((cell) => {\r\n      wordOnCurrentRow += cell.innerText;\r\n    });\r\n\r\n    const currentCell = getCurrentCell(wordOnCurrentRow);\r\n\r\n    currentCell.classList.add('currentCell');\r\n    currentCell.innerText = e.key.toUpperCase();\r\n    wordOnCurrentRow += e.key;\r\n\r\n    console.log(\"iscurrentRowFull: \", isCurrentRowFull(wordOnCurrentRow));\r\n\r\n    if (!isCurrentRowFull(wordOnCurrentRow)) {\r\n      return;\r\n    }\r\n\r\n    //   word has been correctly guessed\r\n    if (wordHasBeenGuessed(wordOnCurrentRow)) {\r\n\r\n        console.log(\"wordhasbeenguessed: \", wordHasBeenGuessed(wordOnCurrentRow));\r\n      handleWin();\r\n      return;\r\n    }\r\n\r\n    //   word hasn't been guessed yet, but row is full\r\n    //   color the cells\r\n    const cells = document.querySelectorAll(`.cell-${currentRowIndex}`);\r\n\r\n    cells.forEach((cell, idx) => {\r\n      if (cell.innerText === wordToBeGuessed[idx]) {\r\n        cell.classList.add('exactMatch');\r\n      } else if (wordToBeGuessed.indexOf(cell.innerText) !== -1) {\r\n        cell.classList.add('match');\r\n      } else {\r\n        cell.classList.add('noMatch');\r\n      }\r\n\r\n      cell.setAttribute('disabled', true);\r\n    });\r\n\r\n    //   move to next row, if any rows are left\r\n    if (anyRowsLeft) {\r\n      currentRowIndex++;\r\n    }\r\n  });\r\n}\r\n\r\nfunction handleWin() {\r\n  document.querySelectorAll('.cell').forEach((cell) => {\r\n    cell.setAttribute('disabled', 'true');\r\n  });\r\n  console.log('YOU WON');\r\n}\r\n\r\nfunction initGame() {\r\n  (0,_grid_js__WEBPACK_IMPORTED_MODULE_0__.createGrid)();\r\n  addEventListeners();\r\n}\r\n\r\ninitGame();\r\n\n\n//# sourceURL=webpack://wordle/./src/app.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ROW_COUNT\": () => (/* binding */ ROW_COUNT),\n/* harmony export */   \"WORD_LENGTH\": () => (/* binding */ WORD_LENGTH)\n/* harmony export */ });\nconst WORD_LENGTH = 5;\r\nconst ROW_COUNT = 6;\n\n//# sourceURL=webpack://wordle/./src/constants.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createGrid\": () => (/* binding */ createGrid)\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/constants.js\");\n/* harmony import */ var _Row_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Row.js */ \"./src/Row.js\");\n\r\n\r\n\r\nfunction createGrid() {\r\n  for (let rowNumber = 0; rowNumber < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROW_COUNT; rowNumber++) {\r\n    const row = new _Row_js__WEBPACK_IMPORTED_MODULE_1__.Row(rowNumber);\r\n    row.create();\r\n    row.createCells();\r\n    row.addToGrid();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://wordle/./src/grid.js?");

/***/ }),

/***/ "./src/words.js":
/*!**********************!*\
  !*** ./src/words.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"words\": () => (/* binding */ words)\n/* harmony export */ });\nconst words = [\r\n  'Abuse',\r\n  'Adult',\r\n  'Agent',\r\n  'Anger',\r\n  'Apple',\r\n  'Award',\r\n  'Basis',\r\n  'Beach',\r\n  'Birth',\r\n  'Block',\r\n  'Blood',\r\n  'Board',\r\n  'Brain',\r\n  'Bread',\r\n  'Break',\r\n  'Brown',\r\n  'Buyer',\r\n  'Cause',\r\n  'Chain',\r\n  'Chair',\r\n  'Chest',\r\n  'Chief',\r\n  'Child',\r\n  'China',\r\n  'Claim',\r\n  'Class',\r\n  'Clock',\r\n  'Coach',\r\n  'Coast',\r\n  'Court',\r\n  'Cover',\r\n  'Cream',\r\n  'Crime',\r\n  'Cross',\r\n  'Crowd',\r\n  'Crown',\r\n  'Cycle',\r\n  'Dance',\r\n  'Death',\r\n  'Depth',\r\n  'Doubt',\r\n  'Draft',\r\n  'Drama',\r\n  'Dream',\r\n  'Dress',\r\n  'Drink',\r\n  'Drive',\r\n  'Earth',\r\n  'Enemy',\r\n  'Entry',\r\n  'Error',\r\n  'Event',\r\n  'Faith',\r\n  'Fault',\r\n  'Field',\r\n  'Fight',\r\n  'Final',\r\n  'Floor',\r\n  'Focus',\r\n  'Force',\r\n  'Frame',\r\n  'Frank',\r\n  'Front',\r\n  'Fruit',\r\n  'Glass',\r\n  'Grant',\r\n  'Grass',\r\n  'Green',\r\n  'Group',\r\n  'Guide',\r\n  'Heart',\r\n  'Henry',\r\n  'Horse',\r\n  'Hotel',\r\n  'House',\r\n  'Image',\r\n  'Index',\r\n  'Input',\r\n  'Issue',\r\n  'Japan',\r\n  'Jones',\r\n  'Judge',\r\n  'Knife',\r\n  'Laura',\r\n  'Layer',\r\n  'Level',\r\n  'Lewis',\r\n  'Light',\r\n  'Limit',\r\n  'Lunch',\r\n  'Major',\r\n  'March',\r\n  'Match',\r\n  'Metal',\r\n  'Model',\r\n  'Money',\r\n  'Month',\r\n  'Motor',\r\n  'Mouth',\r\n  'Music',\r\n  'Night',\r\n  'Noise',\r\n  'North',\r\n  'Novel',\r\n  'Nurse',\r\n  'Offer',\r\n  'Order',\r\n  'Other',\r\n  'Owner',\r\n  'Panel',\r\n  'Paper',\r\n  'Party',\r\n  'Peace',\r\n  'Peter',\r\n  'Phase',\r\n  'Phone',\r\n  'Piece',\r\n  'Pilot',\r\n  'Pitch',\r\n  'Place',\r\n  'Plane',\r\n  'Plant',\r\n  'Plate',\r\n  'Point',\r\n  'Pound',\r\n  'Power',\r\n  'Press',\r\n  'Price',\r\n  'Pride',\r\n  'Prize',\r\n  'Proof',\r\n  'Queen',\r\n  'Radio',\r\n  'Range',\r\n  'Ratio',\r\n  'Reply',\r\n  'Right',\r\n  'River',\r\n  'Round',\r\n  'Route',\r\n  'Rugby',\r\n  'Scale',\r\n  'Scene',\r\n  'Scope',\r\n  'Score',\r\n  'Sense',\r\n  'Shape',\r\n  'Share',\r\n  'Sheep',\r\n  'Sheet',\r\n  'Shift',\r\n  'Shirt',\r\n  'Shock',\r\n  'Sight',\r\n  'Simon',\r\n  'Skill',\r\n  'Sleep',\r\n  'Smile',\r\n  'Smith',\r\n  'Smoke',\r\n  'Sound',\r\n  'South',\r\n  'Space',\r\n  'Speed',\r\n  'Spite',\r\n  'Sport',\r\n  'Squad',\r\n  'Staff',\r\n  'Stage',\r\n  'Start',\r\n  'State',\r\n  'Steam',\r\n  'Steel',\r\n  'Stock',\r\n  'Stone',\r\n  'Store',\r\n  'Study',\r\n  'Stuff',\r\n  'Style',\r\n  'Sugar',\r\n  'Table',\r\n  'Taste',\r\n  'Terry',\r\n  'Theme',\r\n  'Thing',\r\n  'Title',\r\n  'Total',\r\n  'Touch',\r\n  'Tower',\r\n  'Track',\r\n  'Trade',\r\n  'Train',\r\n  'Trend',\r\n  'Trial',\r\n  'Trust',\r\n  'Truth',\r\n  'Uncle',\r\n  'Union',\r\n  'Unity',\r\n  'Value',\r\n  'Video',\r\n  'Visit',\r\n  'Voice',\r\n  'Waste',\r\n  'Watch',\r\n  'Water',\r\n  'While',\r\n  'White',\r\n  'Whole',\r\n  'Woman',\r\n  'World',\r\n  'Youth',\r\n  'Alcon',\r\n  'Aught',\r\n  'Hella',\r\n  'One’s',\r\n  'Ought',\r\n  'Thame',\r\n  'There',\r\n  'Thine',\r\n  'Thine',\r\n  'Where',\r\n  'Which',\r\n  'Whose',\r\n  'Whoso',\r\n  'Yours',\r\n  'Yours',\r\n  'Admit',\r\n  'Adopt',\r\n  'Agree',\r\n  'Allow',\r\n  'Alter',\r\n  'Apply',\r\n  'Argue',\r\n  'Arise',\r\n  'Avoid',\r\n  'Begin',\r\n  'Blame',\r\n  'Break',\r\n  'Bring',\r\n  'Build',\r\n  'Burst',\r\n  'Carry',\r\n  'Catch',\r\n  'Cause',\r\n  'Check',\r\n  'Claim',\r\n  'Clean',\r\n  'Clear',\r\n  'Climb',\r\n  'Close',\r\n  'Count',\r\n  'Cover',\r\n  'Cross',\r\n  'Dance',\r\n  'Doubt',\r\n  'Drink',\r\n  'Drive',\r\n  'Enjoy',\r\n  'Enter',\r\n  'Exist',\r\n  'Fight',\r\n  'Focus',\r\n  'Force',\r\n  'Guess',\r\n  'Imply',\r\n  'Issue',\r\n  'Judge',\r\n  'Laugh',\r\n  'Learn',\r\n  'Leave',\r\n  'Let’s',\r\n  'Limit',\r\n  'Marry',\r\n  'Match',\r\n  'Occur',\r\n  'Offer',\r\n  'Order',\r\n  'Phone',\r\n  'Place',\r\n  'Point',\r\n  'Press',\r\n  'Prove',\r\n  'Raise',\r\n  'Reach',\r\n  'Refer',\r\n  'Relax',\r\n  'Serve',\r\n  'Shall',\r\n  'Share',\r\n  'Shift',\r\n  'Shoot',\r\n  'Sleep',\r\n  'Solve',\r\n  'Sound',\r\n  'Speak',\r\n  'Spend',\r\n  'Split',\r\n  'Stand',\r\n  'Start',\r\n  'State',\r\n  'Stick',\r\n  'Study',\r\n  'Teach',\r\n  'Thank',\r\n  'Think',\r\n  'Throw',\r\n  'Touch',\r\n  'Train',\r\n  'Treat',\r\n  'Trust',\r\n  'Visit',\r\n  'Voice',\r\n  'Waste',\r\n  'Watch',\r\n  'Worry',\r\n  'Would',\r\n  'Write',\r\n  'Above',\r\n  'Acute',\r\n  'Alive',\r\n  'Alone',\r\n  'Angry',\r\n  'Aware',\r\n  'Awful',\r\n  'Basic',\r\n  'Black',\r\n  'Blind',\r\n  'Brave',\r\n  'Brief',\r\n  'Broad',\r\n  'Brown',\r\n  'Cheap',\r\n  'Chief',\r\n  'Civil',\r\n  'Clean',\r\n  'Clear',\r\n  'Close',\r\n  'Crazy',\r\n  'Daily',\r\n  'Dirty',\r\n  'Early',\r\n  'Empty',\r\n  'Equal',\r\n  'Exact',\r\n  'Extra',\r\n  'Faint',\r\n  'False',\r\n  'Fifth',\r\n  'Final',\r\n  'First',\r\n  'Fresh',\r\n  'Front',\r\n  'Funny',\r\n  'Giant',\r\n  'Grand',\r\n  'Great',\r\n  'Green',\r\n  'Gross',\r\n  'Happy',\r\n  'Harsh',\r\n  'Heavy',\r\n  'Human',\r\n  'Ideal',\r\n  'Inner',\r\n  'Joint',\r\n  'Large',\r\n  'Legal',\r\n  'Level',\r\n  'Light',\r\n  'Local',\r\n  'Loose',\r\n  'Lucky',\r\n  'Magic',\r\n  'Major',\r\n  'Minor',\r\n  'Moral',\r\n  'Naked',\r\n  'Nasty',\r\n  'Naval',\r\n  'Other',\r\n  'Outer',\r\n  'Plain',\r\n  'Prime',\r\n  'Prior',\r\n  'Proud',\r\n  'Quick',\r\n  'Quiet',\r\n  'Rapid',\r\n  'Ready',\r\n  'Right',\r\n  'Roman',\r\n  'Rough',\r\n  'Round',\r\n  'Royal',\r\n  'Rural',\r\n  'Sharp',\r\n  'Sheer',\r\n  'Short',\r\n  'Silly',\r\n  'Sixth',\r\n  'Small',\r\n  'Smart',\r\n  'Solid',\r\n  'Sorry',\r\n  'Spare',\r\n  'Steep',\r\n  'Still',\r\n  'Super',\r\n  'Sweet',\r\n  'Thick',\r\n  'Third',\r\n  'Tight',\r\n  'Total',\r\n  'Tough',\r\n  'Upper',\r\n  'Upset',\r\n  'Urban',\r\n  'Usual',\r\n  'Vague',\r\n  'Valid',\r\n  'Vital',\r\n  'White',\r\n  'Whole',\r\n  'Wrong',\r\n  'Young',\r\n  'Afore',\r\n  'After',\r\n  'Bothe',\r\n  'Other',\r\n  'Since',\r\n  'Slash',\r\n  'Until',\r\n  'Where',\r\n  'While',\r\n  'Aback',\r\n  'Abaft',\r\n  'Aboon',\r\n  'About',\r\n  'Above',\r\n  'Accel',\r\n  'Adown',\r\n  'Afoot',\r\n  'Afore',\r\n  'Afoul',\r\n  'After',\r\n  'Again',\r\n  'Agape',\r\n  'Agogo',\r\n  'Agone',\r\n  'Ahead',\r\n  'Ahull',\r\n  'Alife',\r\n  'Alike',\r\n  'Aline',\r\n  'Aloft',\r\n  'Alone',\r\n  'Along',\r\n  'Aloof',\r\n  'Aloud',\r\n  'Amiss',\r\n  'Amply',\r\n  'Amuck',\r\n  'Apace',\r\n  'Apart',\r\n  'Aptly',\r\n  'Arear',\r\n  'Aside',\r\n  'Askew',\r\n  'Awful',\r\n  'Badly',\r\n  'Bally',\r\n  'Below',\r\n  'Canny',\r\n  'Cheap',\r\n  'Clean',\r\n  'Clear',\r\n  'Coyly',\r\n  'Daily',\r\n  'Dimly',\r\n  'Dirty',\r\n  'Ditto',\r\n  'Drily',\r\n  'Dryly',\r\n  'Dully',\r\n  'Early',\r\n  'Extra',\r\n  'False',\r\n  'Fatly',\r\n  'Feyly',\r\n  'First',\r\n  'Fitly',\r\n  'Forte',\r\n  'Forth',\r\n  'Fresh',\r\n  'Fully',\r\n  'Funny',\r\n  'Gaily',\r\n  'Gayly',\r\n  'Godly',\r\n  'Great',\r\n  'Haply',\r\n  'Heavy',\r\n  'Hella',\r\n  'Hence',\r\n  'Hotly',\r\n  'Icily',\r\n  'Infra',\r\n  'Jildi',\r\n  'Jolly',\r\n  'Laxly',\r\n  'Lento',\r\n  'Light',\r\n  'Lowly',\r\n  'Madly',\r\n  'Maybe',\r\n  'Never',\r\n  'Newly',\r\n  'Nobly',\r\n  'Oddly',\r\n  'Often',\r\n  'Other',\r\n  'Ought',\r\n  'Party',\r\n  'Piano',\r\n  'Plain',\r\n  'Plonk',\r\n  'Plumb',\r\n  'Prior',\r\n  'Queer',\r\n  'Quick',\r\n  'Quite',\r\n  'Ramen',\r\n  'Rapid',\r\n  'Redly',\r\n  'Right',\r\n  'Rough',\r\n  'Round',\r\n  'Sadly',\r\n  'Secus',\r\n  'Selly',\r\n  'Sharp',\r\n  'Sheer',\r\n  'Shily',\r\n  'Short',\r\n  'Shyly',\r\n  'Silly',\r\n  'Since',\r\n  'Sleek',\r\n  'Slyly',\r\n  'Small',\r\n  'Sound',\r\n  'Spang',\r\n  'Srsly',\r\n  'Stark',\r\n  'Still',\r\n  'Stone',\r\n  'Stour',\r\n  'Super',\r\n  'Tally',\r\n  'Tanto',\r\n  'There',\r\n  'Thick',\r\n  'Tight',\r\n  'Today',\r\n  'Tomoz',\r\n  'Truly',\r\n  'Twice',\r\n  'Under',\r\n  'Utter',\r\n  'Verry',\r\n  'Wanly',\r\n  'Wetly',\r\n  'Where',\r\n  'Wrong',\r\n  'Wryly',\r\n  'Abaft',\r\n  'Aboon',\r\n  'About',\r\n  'Above',\r\n  'Adown',\r\n  'Afore',\r\n  'After',\r\n  'Along',\r\n  'Aloof',\r\n  'Among',\r\n  'Below',\r\n  'Circa',\r\n  'Cross',\r\n  'Furth',\r\n  'Minus',\r\n  'Neath',\r\n  'Round',\r\n  'Since',\r\n  'Spite',\r\n  'Under',\r\n  'Until',\r\n  'Aargh',\r\n  'Adieu',\r\n  'Adios',\r\n  'Alack',\r\n  'Aloha',\r\n  'Avast',\r\n  'Bakaw',\r\n  'Basta',\r\n  'Begad',\r\n  'Bless',\r\n  'Blige',\r\n  'Brava',\r\n  'Bravo',\r\n  'Bring',\r\n  'Chook',\r\n  'Damme',\r\n  'Dildo',\r\n  'Ditto',\r\n  'Frick',\r\n  'Fudge',\r\n  'Golly',\r\n  'Gratz',\r\n  'Hallo',\r\n  'Hasta',\r\n  'Havoc',\r\n  'Hella',\r\n  'Hello',\r\n  'Howay',\r\n  'Howdy',\r\n  'Hullo',\r\n  'Huzza',\r\n  'Jesus',\r\n  'Kapow',\r\n  'Loose',\r\n  'Lordy',\r\n  'Marry',\r\n  'Mercy',\r\n  'Night',\r\n  'Plonk',\r\n  'Psych',\r\n  'Quite',\r\n  'Salve',\r\n  'Skoal',\r\n  'Sniff',\r\n  'Sooey',\r\n  'There',\r\n  'Thiam',\r\n  'Thwap',\r\n  'Tough',\r\n  'Twirp',\r\n  'Viola',\r\n  'Vivat',\r\n  'Wacko',\r\n  'Wahey',\r\n  'Whist',\r\n  'Wilma',\r\n  'Wirra',\r\n  'Woops',\r\n  'Wowie',\r\n  'Yecch',\r\n  'Yeeha',\r\n  'Yeesh',\r\n  'Yowch',\r\n  'Zowie',\r\n];\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (words);\n\n//# sourceURL=webpack://wordle/./src/words.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;