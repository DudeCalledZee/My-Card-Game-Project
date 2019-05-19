// variables

const cards = document.querySelectorAll('.card');


// Loop through list add listener
cards.forEach(card => card.addEventListener('click', cardFlip));


// Card Flip Function
function cardFlip() {
  this.classList.toggle('flip');
}