let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function updateScore() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function totalGames() {
  document.querySelector('.js-total-games')
    .innerHTML = `Total Games: ${score.wins + score.losses + score.ties}`;
}

updateScore();
totalGames();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }

  return computerMove;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie! 😌';
    } else if (computerMove === 'Paper') {
      result = 'You lose! 😓';
    } else {
      result = 'You win! 😁';
    }
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win! 😁';
    } else if (computerMove === 'Paper') {
      result = 'Tie! 😌';
    } else {
      result = 'You lose! 😓';
    }
  } else {
    if (computerMove === 'Rock') {
      result = 'You lose! 😓';
    } else if (computerMove === 'Paper') {
      result = 'You win! 😁';
    } else {
      result = 'Tie! 😌';
    }
  }

  if (result === 'You win! 😁') {
    score.wins++;
  } else if (result === 'You lose! 😓') {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();
  totalGames();

  document.querySelector('.js-player-move')
    .innerHTML = `You picked: ${playerMove}.`;

  document.querySelector('.js-computer-move')
    .innerHTML = `Computer picked: ${computerMove}.`;

  document.querySelector('.js-result')
    .innerHTML = result;
}

function reset() {
  document.querySelector('.js-player-move')
    .innerHTML = '';

  document.querySelector('.js-computer-move')
    .innerHTML = '';

  document.querySelector('.js-result')
    .innerHTML = '';
}

let playing = false;
let interval;

function autoPlay() {
  if (!playing) {
    interval = setInterval(() => {
      playGame(pickComputerMove());
    }, 2000);
    playing = true;
  } else {
    clearInterval(interval);
    playing = false;
  }
}

function toggle() {
  buttonElement = document.querySelector('.js-auto-play-button')
  if (buttonElement.innerText === 'Auto Play') {
    buttonElement.innerText = 'Stop Auto Play';
  } else {
    buttonElement.innerText = 'Auto Play';
  }
}
