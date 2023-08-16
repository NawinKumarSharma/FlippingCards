const cards = document.querySelectorAll(".card")

// variables
var isFlipped = false;
var firstCard;
var secondCard;
let lockBoard = false; // Prevents clicking during card flipping and comparison


cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  if (lockBoard) return;
  if (this === firstCard) return; // It ignores clicking on the same card

  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkIt();
  }
}

function checkIt() {
  lockBoard = true;
  if (firstCard.dataset.image === secondCard.dataset.image) {
    success();
  } else {
    fail();

  }
}


function success() {
  firstCard.removeEventListener("click", flip)
  secondCard.removeEventListener("click", flip)
  reset();
}



function fail() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 450);
}



function reset() {
  [isFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffling the cards using the Fisher-Yates shuffle algorithm

(function shuffle() {
  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
})();