const rgbColorText = document.getElementById('rgb-color');
const balls = document.getElementsByClassName('ball');
const answer = document.getElementById('answer');
const ballsList = document.getElementById('balls-list');
const btnReset = document.getElementById('reset-game');
const btnResetScore = document.getElementById('reset-score');
const score = document.getElementById('score');
const game = document.querySelector('.game')
let totalScore = 0;
if (localStorage.getItem('Pontuação jogo descubra a cor JAF') === null) {
  score.innerHTML = 0;
} else {
  totalScore = parseFloat(localStorage.getItem('Pontuação jogo descubra a cor JAF'));
  score.innerHTML = totalScore;
}

function ramdomRGB() {
  const ramdomColor = Math.floor(Math.random() * 256);
  return ramdomColor;
}

function generateRandomColor() {
  for (let index = 0; index < balls.length; index += 1) {
    balls[index].style.background = `rgb(${ramdomRGB()}, ${ramdomRGB()}, ${ramdomRGB()})`;
  }
}

function colorToGuess() {
  const colorSelected = balls[Math.floor(Math.random() * 6)];
  rgbColorText.innerHTML = colorSelected.style.background;
}

function checkAnswer() {
  ballsList.addEventListener('click', function (event) {
    if (event.target.style.background === rgbColorText.innerText) {
      game.innerHTML = 'Resposta correta!<br>';
      totalScore += 3;
      localStorage.setItem('Pontuação jogo descubra a cor JAF', totalScore);
      score.innerHTML = totalScore;
      const divAnswer = document.createElement('div');
      divAnswer.className = 'ball';
      divAnswer.style.background = rgbColorText.innerText;
      game.appendChild(divAnswer);
      game.innerHTML += `<br>${rgbColorText.innerText}<br>`;
      const btnNextTurn = document.createElement('button')
      btnNextTurn.innerHTML = 'Nova rodada';
      btnNextTurn.id = 'reset-game'
      game.appendChild(btnNextTurn)
      btnNextTurn.addEventListener('click', function () {
        window.location.reload();
      })
    } else {
      game.innerHTML = `Errou! pontuação final: ${localStorage.getItem('Pontuação jogo descubra a cor JAF')}<br>`;
      const divAnswer = document.createElement('div');
      divAnswer.className = 'ball';
      divAnswer.style.background = rgbColorText.innerText;
      game.appendChild(divAnswer);
      game.innerHTML += `<br>${rgbColorText.innerText}<br>`;
      const btnNewGame = document.createElement('button');
      btnNewGame.innerHTML = 'Novo jogo';
      game.appendChild(btnNewGame);
      btnNewGame.addEventListener('click', function () {
        resetSavedScore();
      })
    }
  });
}

function resetReloadPage() {
    window.location.reload();
}

function resetSavedScore() {
    const initialScore = 0;
    localStorage.setItem('Pontuação jogo descubra a cor JAF', initialScore);
    window.location.reload();
}

// chamadas
generateRandomColor();
colorToGuess();
checkAnswer();

