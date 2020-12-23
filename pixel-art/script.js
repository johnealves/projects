const colorPallet = document.getElementById('color-palette');
const palette = document.getElementsByClassName('color');
const pixelBoard = document.getElementById('pixel-board');
const pixelList = document.getElementsByClassName('pixel');
const btnClearBoard = document.getElementById('clear-board');
const inputNumber = document.getElementById('board-size');
const btnGenerateBoard = document.getElementById('generate-board');
const colorPicker = document.getElementsByName('color-picker')

function ramdonNumber(num) {
  return Math.floor(Math.random() * num);
}

function rgbColor() {
  return `rgb(${ramdonNumber(256)}, ${ramdonNumber(256)}, ${ramdonNumber(256)})`;
}

function resetSelected() {
  palette[1].style.classList.remove('selected')
  palette[0].className = 'selected'
}

function changeColor(cor) {
  palette[0].style.color = cor;
}

function colorPaletteBackground() {
  palette[0].style.color = 'black'
  palette[1].style.color = 'white'
}

function selectedPallet() {
  colorPallet.addEventListener('click', function (event) {
    for (let index = 0; index < palette.length; index += 1) {
      if (palette[index].classList.contains('selected')) {
        palette[index].classList.remove('selected');
      }
    }
    event.target.classList.add('selected')
  });
}

function paintBoard() {
  pixelBoard.addEventListener('click', (event) => {
    let colorPaint = 'black';
    for (let index = 0; index < palette.length; index += 1) {
      if (palette[index].classList.contains('selected')) {
        colorPaint = palette[index].style.color;
      }
    }
    if (event.target.classList.contains('pixel')) {
      event.target.style.background = colorPaint;
    }
  });
}

function clearBoard() {
  btnClearBoard.addEventListener('click', () => {
    for (let index = 0; index < pixelList.length; index += 1) {
      pixelList[index].style.background = 'white';
    }
  });
}

function boardLength() {
  btnGenerateBoard.addEventListener('click', () => {
    let numberBoard = 0;
    if (inputNumber.value === '') {
      alert('Board inválido!');
    } else if (parseInt(inputNumber.value) < 5) {
      numberBoard = 5
    } else if (parseInt(inputNumber.value) > 50) {
      numberBoard =50
    } else {
      numberBoard = parseInt(inputNumber.value);
    }
    pixelBoard.innerHTML = ''
    let totalBoard = numberBoard * numberBoard;
    let sizepixel = (540 / numberBoard) -2;
    for (let index = 0; index < totalBoard; index += 1) {
      let divpixel = document.createElement('div')
      divpixel.className = 'pixel';
      divpixel.style.width = sizepixel+'px';
      divpixel.style.height = sizepixel+'px';
      divpixel.style.background = 'white';
      pixelBoard.appendChild(divpixel);
    }
    pixelBoard.style.maxWidth = numberBoard * (sizepixel+2) +'px';
    pixelBoard.style.maxHeight = numberBoard * (sizepixel+2) +'px';
  });
}

selectedPallet();
paintBoard();
colorPaletteBackground();
clearBoard();
boardLength();
