let playerHand = [];
let bankerHand = [];
let balance = 1000;
let betAmount = 0;

// New variable to store the selected hand
let selectedHand = '';

function placeBet() {
    betAmount = parseInt(document.getElementById("betAmount").value);
    const selectedRadio = document.querySelector('input[name="hand"]:checked');

    if (betAmount > 0 && betAmount <= balance && selectedRadio) {
        selectedHand = selectedRadio.value;
        balance -= betAmount;
        updateBalance();
    } else {
        alert("Invalid bet amount or hand not selected");
    }
}

function dealCards() {
    // Check if the hand is selected
    if (!selectedHand) {
        alert("Please select a hand before dealing cards");
        return;
    }

    playerHand = drawCard();
    bankerHand = drawCard();

    displayCards("player-hand", playerHand);
    displayCards("banker-hand", bankerHand);

    determineWinner();
}

function drawCard() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0];
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

function displayCards(elementId, hand) {
    const handElement = document.getElementById(elementId);
    handElement.innerHTML = "";

    hand.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = card;
        handElement.appendChild(cardElement);
    });
}


function determineWinner() {
    const playerTotal = calculateTotal(playerHand);
    const bankerTotal = calculateTotal(bankerHand);

    let resultMessage = "Result: ";

    if (playerTotal > bankerTotal) {
        resultMessage += "Player wins!";
        balance += betAmount * 2;
    } else if (playerTotal < bankerTotal) {
        resultMessage += "Banker wins!";
    } else {
        resultMessage += "It's a tie!";
        balance += betAmount;
    }

    updateBalance();
    document.getElementById("result").textContent = resultMessage;
}

function calculateTotal(hand) {
    const total = hand.reduce((sum, card) => sum + card, 0);
    return total % 10;
}

function updateBalance() {
    document.getElementById("balance").textContent = `Balance: $${balance}`;
}
