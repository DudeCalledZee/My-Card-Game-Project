// variables

const cards = document.querySelectorAll('.card');

let isCardFlipped = false;
let twoCardFlipped = false;
let firstCard;
let secondCard;

// Loop through list add listener
cards.forEach(card => card.addEventListener('click', cardFlip));

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
    } else {
      twoCardFlipped = true;
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        twoCardFlipped = false;
      }, 1000);
    }
  }
}