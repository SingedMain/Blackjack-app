
let allCards = document.querySelector("#cards-el");
let result = document.getElementById("game-result");
let cardSum = document.querySelector("#sum-el");
let currentBetEl = document.querySelector("#current-bet");
let moneyBetEl = document.querySelector("#money-bet");
let totalMoneyEl = document.querySelector("#total-money");
let errorTextEl = document.querySelector("#error-text");
winningsEl = document.getElementById("winnings");
let totalMoney = 1000;
let moneyBet = 0;
let currentBet = 0;
currentBetEl.textContent = "Current bet: " + "$" + currentBet;
moneyBetEl.textContent = "Money bet: " + "$" + moneyBet;
totalMoneyEl.textContent = "Total money: " + "$" + totalMoney; 
let sumCard = 0;
let cards = [];
let hasBlackJack = false;
let isAlive = false;
let gameOn = false;
let adjustMoney = true;

let player = {
  name: "Matas",
  chips: 145,
  sayHello: function() {
  }
}

function addMoney() {
  if(moneyBet < totalMoney && adjustMoney) {
    moneyBet += 50;
    moneyBetEl.textContent = "Money bet: " + "$" + moneyBet;
  }
  
}

function substractMoney() {
  if(moneyBet > 0 && adjustMoney) {
    moneyBet -= 50;
    moneyBetEl.textContent = "Money bet: " + "$" + moneyBet;
  }
  
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
   if(randomNumber == 1) {
     return 11;
   } else if(randomNumber > 10) {
     return 10;
   } else {
     return randomNumber;
   }
  }


function startGame() {
  if(moneyBet > 0 && !gameOn) { 
    gameOn = true;
    adjustMoney = false;
    yourBet = moneyBet;
    currentBetEl.textContent = "Current bet: " + "$" + yourBet;
    totalMoney -= moneyBet;
    moneyBet = 0;
    moneyBetEl.textContent = "Money bet: " + "$" + moneyBet;
    totalMoneyEl.textContent = "Total money: " + "$" + totalMoney;
    errorTextEl.textContent = null;
    winningsEl.textContent = null;
    isAlive = true;
    hasBlackJack = false;
    let card1 = getRandomCard();
    let card2 = getRandomCard();
    sumCard = card1 + card2;
    cards = [card1, card2];
    renderGame();
  }
  else if(gameOn){
    errorTextEl.textContent = null;
  }
  else {
    errorTextEl.textContent = "You have to bet at least $50!"
  }
}

 function renderGame() {

   allCards.textContent = "Cards: ";
   for(let i = 0; i < cards.length; i++) {
     allCards.textContent += cards[i] + " ";
   }
   cardSum.textContent = "Sum: " + sumCard;
 if(sumCard == 21) {
   result.textContent = "You've got Blackjack!";
   hasBlackJack = true;
   totalMoney += yourBet * 5;
   gameOn = false;
   adjustMoney = true;
   currentBetEl.textContent = "Current bet: " + "$" + 0;
   totalMoneyEl.textContent = "Total money: " + "$" + totalMoney;
   document.getElementById("winnings").className = "profit";
   winningsEl.textContent = "+ " + "$" + yourBet * 5;
   yourBet = 0;
   
 }
 else if(sumCard < 21) {
   result.textContent = "Wanna draw another card?"
 }
 else {
   result.textContent = "You've gone BUST!"
   isAlive = false;
   gameOn = false;
   adjustMoney = true;
   currentBetEl.textContent = "Current bet: " + "$" + 0;
   document.getElementById("winnings").className = "loss";
   winningsEl.textContent = "- " + "$" + yourBet;
   yourBet = 0;
 }

}

function newCard() {
  if(hasBlackJack == false && isAlive == true) {
    let card = getRandomCard();
    sumCard += card;
    cards.push(card);
    renderGame();
  }

}
