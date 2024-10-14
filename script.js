let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new_game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
// Winning Patterns array
let winningPatterns = [ 
    [0, 1, 2],
    [0, 3, 6],  
    [2, 5, 8],
    [6, 7, 8], 
    [3, 4, 5], 
    [1, 4, 7], 
    [0, 4, 8], 
    [2, 4, 6], 
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable all buttons
const disabledButtons = () => {
    btnRef.forEach((element) => element.disabled = true);
    //Enable popup
    popupRef.classList.remove("hide");
};

//Enable all buttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = ""; 
        element.disabled = false;
    });
    //Disable popup
    popupRef.classList.add("hide");
};


// This function is executed when a player wins
const winFunction = (letter) => {
    disabledButtons();
    if (letter == "X"){
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    }
    else {
        msgRef.innerHTML = "&#x1F389; <br> '0' Wins";
    }
};

//Function for draw
const drawFunction = () => {
    disabledButtons();
    msgRef.innerHTML = "&#x1F389; <br> It's a Draw";
};

//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});



//Win Logic
const checkWinner = () => { 
    //Loop through all win patterns
    for (let i of winningPatterns) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText, 
            btnRef[i[2]].innerText,
        ];
        //chech if elements are filled
        //If 3 empty elements are same and would give win 
        //as would
         if(element1 != "" && element2 !=  "" && element3 != ""){
            if (element1 == element2 && element2 == element3){
                //If all 3 buttons have same value then pass the value to winFunction
                winFunction(element1);
            }
        }
            
    
    };
};

// Display X/0 on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn){
            xTurn = false;
            // Display X
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;
            // Display Y
            element.innerText = "0";
            element.disabled = true;
        }
        // increment count on each click
        count+=1;
        if (count == 9){
            drawFunction();
        }
        // Check for winner
        checkWinner();
        
    });
});
// Enable buttons and disable popup on page load
window.onload = enableButtons();