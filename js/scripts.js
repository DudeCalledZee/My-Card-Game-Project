// variables
const cards = document.querySelectorAll('.card');
const startGame = document.getElementById('start-game');
const stars = document.querySelectorAll('.stars');
const restart = document.getElementById('restart');

const winner = document.getElementById('win');

let score = 100;
let isCardFlipped = false;
let twoCardFlipped = false;
let firstCard;
let secondCard;
let startTime;
let endTime;
let matches = 0;

//New Game
startGame.addEventListener('click', () => {
  startGame.style.display = 'none';
  start();
});

//restart
restart.addEventListener('click', () => {
  restart.style.display = 'none';
  location.reload();
});

winner.addEventListener('click', () => {
  restart.style.display = 'none';
  location.reload();
});

// Loop through list add listener
cards.forEach(card => card.addEventListener('click', cardFlip));

// Shuffles the cards
(function shuffle() {
  cards.forEach(card => {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
})();

// Card Flip Function
function cardFlip() {
  // stops more then two cards opening
  if (twoCardFlipped) return;
  // stops same card opening twice
  if (this === firstCard) return;

  this.classList.toggle('flip');
  //have two cards been flipped
  if (!isCardFlipped) {
    isCardFlipped = true;
    firstCard = this;
  } else {
    isCardFlipped = false;
    secondCard = this;
    // is it a match
    if (firstCard.dataset.name === secondCard.dataset.name) {
      firstCard.removeEventListener('click', cardFlip);
      secondCard.removeEventListener('click', cardFlip);
      matches += 1;

      win();
    } else {
      twoCardFlipped = true;
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        twoCardFlipped = false;
      }, 1000);
      score -= 25;

      lose();

    }
  };
};


// function losing
function lose() {
  if (score === 100 || score === 75) {} else if (score === 50) {
    stars[0].style.display = 'none';
  } else if (score > 0) {
    stars[1].style.display = 'none';
  } else {
    end()
    stars[2].style.display = 'none';
    restart.style.display = 'block';
  }
};

function win() {
  if (matches === 8) {
    winner.style.display = 'block';
    end();
  }
};



// Time taken function
function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  let timeDiff = endTime - startTime;
  timeDiff /= 1000;

  // in seconds
  let seconds = Math.round(timeDiff);
  if (matches === 8) {
    document.getElementById("time-win").innerHTML = `It took you ${seconds} seconds`
  } else {
    document.getElementById("time-taken").innerHTML = `
    It took you ${seconds} seconds `;
  }
};