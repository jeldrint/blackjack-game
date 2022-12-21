console.clear();
const statusEl = document.querySelector('#status-el');
const playerCard = document.querySelector('#player-card');
const playerSumEl = document.querySelector('#player-sum');
const bankerCard = document.querySelector('#banker-card');
const bankerSumEl = document.querySelector('#banker-sum');
const moneyAmount = document.querySelector('#player-money');

let player = {
    name: "",
    money: 1000,
    sum: 0
};
let bankerSum = 0;
const cardSuits = ["\u2660","\u2661","\u2662","\u2663"];
const cardNums = ["A","2","3","4","5","6","7","8","9","T","J","Q","K"];
let cards = [];
let cardSymbol = "";
let cardValue = 0;
let isInitialized = false;
let isStand = false;

function shuffleCards(){
    let randNum = 0;
    let temp = 0;

    for (let i =0; i < cardSuits.length; i++){
        for (let j=0; j < cardNums.length; j++){
            cards.push(cardNums[j] + cardSuits[i]);
        }
    }
    for (let i=0; i < 52; i++){
        randNum = Math.floor(Math.random()*52);
        temp = cards[randNum];
        cards[randNum] = cards[i];
        cards[i] = temp;
    }
}

function drawCard(){
    if(cards.length == 0){
        shuffleCards();
        console.log(cards);
    }

    cardSymbol = cards[0];
    if(cardSymbol.charAt(0) == "T"){
        cardSymbol = "10" + cardSymbol.charAt(1);
    }

    cardValue = cards[0].charAt(0);
    switch (cardValue){
        case 'T':
        case 'J':
        case 'Q':
        case 'K':
            cardValue = 10;
            break;
        case 'A':
            cardValue = 11;
            break;
        default:
            cardValue = parseInt(cardValue);
            break;
    }
    cards.shift();
}

function initializeGame(){
    console.log("New Game!!!!!!!!");
    if (isInitialized == true){
        //bypassing the start game since it started already
        statusEl.textContent = "Game has started. Cannot start again.";
        return;
    }
    isInitialized = true;

    //this is for starting the game again
    player.sum = 0;
    bankerSum = 0;
    bankerCard.textContent = "";
    playerCard.textContent = "";
    isStand = false;

    setTimeout(function(){
        statusEl.textContent = "Okay. Bet is $100";},500);
        
    //initial card for Banker
    drawCard();
    bankerCard.textContent = cardSymbol + " ";
    bankerSum += cardValue;
    bankerSumEl.textContent = bankerSum;
    console.log(cardSymbol, cardValue);
    console.log(cards);

    //initial cards for Player
    let i =0;
    while(i <2){
        drawCard();
        playerCard.textContent += cardSymbol + " ";
        player.sum += cardValue;
        playerSumEl.textContent = player.sum;
        console.log(cardSymbol, cardValue);
        console.log(cards);
        i++
    }

    //checking if initial cards is a blackjack
    //this is next after pause
    //this is next after pause
    //this is next after pause


}

function hit(){
    if (isInitialized == false){
        statusEl.textContent = "You should start the game first.";
        return;
    }
    else if (isStand == true){
        statusEl.textContent = "You cannot hit when you stand already."
        return;
    }
    drawCard();
    playerCard.textContent += cardSymbol + " ";
    player.sum += cardValue;
    playerSumEl.textContent = player.sum;
    console.log(cardSymbol, cardValue);
    console.log(cards);

    if (player.sum <= 20){
        statusEl.textContent = "Hit to draw another card.";
        return;
    } else if(player.sum === 21){
        statusEl.textContent = "You've got blackjack!";
        isInitialized = false;
        player.money += 100;
        moneyAmount.textContent = player.money;
        return;
    } else{
        statusEl.textContent = "You bust.";
        isInitialized = false;
        player.money -= 100;
        moneyAmount.textContent = player.money;
        return;
    }
}

function stand(){
    if (isInitialized == false){
        statusEl.textContent = "You should start the game first.";
        return;
    }
    isStand = true;
    statusEl.textContent = "Banker's Turn";

    setTimeout(function(){
        drawCard();
        bankerCard.textContent += cardSymbol + " ";
        bankerSum += cardValue;
        bankerSumEl.textContent = bankerSum;
    
        if (bankerSum > 21){
            statusEl.textContent = "Banker has busted. You won!"
            isInitialized = false;
            player.money += 100;
            moneyAmount.textContent = player.money;
            return;
        }else if (bankerSum > player.sum){
            statusEl.textContent = "Banker has won";
            isInitialized = false;
            player.money -= 100;
            moneyAmount.textContent = player.money;
            return;
        } else if(bankerSum === 21){
            statusEl.textContent = "Blackjack for Banker! You lost.";
            isNewGame = true;
            isInitialized = false;
            player.money -= 100;
            moneyAmount.textContent = player.money;
            return;
        }
        else if (bankerSum >= 17){
            if(bankerSum > player.sum){
                statusEl.textContent = "Banker has won";
                isNewGame = true;
                isInitialized = false;
                player.money -= 100;
                moneyAmount.textContent = player.money;
                return;
            }else if(bankerSum < player.sum){
                statusEl.textContent = "You won!"
                isNewGame = true;
                isInitialized = false;
                player.money += 100;
                moneyAmount.textContent = player.money;
                return;   
            }else{
                statusEl.textContent = "It's a draw."
                isNewGame = true;
                isInitialized = false;
                return;   
            }
        }
        else{
            stand();
        }    
    },1500)

    console.log(cardSymbol, cardValue);
    console.log(cards);
}


player.name = prompt("Enter Player Name: ");
moneyAmount.textContent = player.money;

let displayName = document.getElementsByClassName('player-name');
for (let i = 0; i < displayName.length; i++){
    displayName[i].textContent = player.name;
}
