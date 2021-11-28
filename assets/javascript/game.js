

//debugger;




var fightOrSKip = function() {
    //ask player if they'd like to fight or skip using fightOrSKip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        //conditional recursive
        if (promptFight === "" || promptFight === null) {
            window.alert("You need to provide a valid answer! Please try again.");
            return fightOrSKip();

        }
        //convert promptFight to all lowercase to check input
        promptFight = promptFight.toLowerCase();


        
        

            //if player choses to skip
            if (promptFight === "skip" || promptFight === "SKIP") {
    
                //confirm player wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
                //if yes (true), leave fight
                if (confirmSkip) {
                    window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            
                    //subtract money from playerMoney for skipping
                    playerInfo.playerMoney = playerInfo.money - 10;

                    return true;
                    
                    shop();
            
                }
            }

            return false;

};


//fight functioin (now with parameter for enemy's name)
var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {

            if(fightOrSKip()) {
                break;
            }
      
            //remove enemy's health by subtracting the amount set in the playerAttack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
            );
        
            //check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemy is dead
                break;

            }else {
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');

            }
        
        
            //remove player's health by subtracting the amount set in the enemyAttack variable
            var damage = randomNumber(enemy.health - 3, enemy.attack);
            
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
                );
            
            
            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
               
                //leave while() loop if player is dead
                break;
            
        
            } else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
            
    }  
        
};


//function to start a new game
var startGame = function() {

    //reset player stats
    playerInfo.reset();



   
  for(var i = 0; i < enemyInfo.length; i++) {

    if (playerInfo.health > 0) {

        //Diplays current round
        window.alert("Welcome to Robot Gladiators! Round " + ( i+ 1) );

        //use debugger to pause script and check
        debugger;

        //pick new enemy to fight based on the indes of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];

        //reset enemyHealth before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

    
        //call fight with robot
        fight(pickedEnemyObj);

        //if alive and not at last enemy in array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

            //store prompt before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            //if yes, take them to the store() function
            if (storeConfirm) {
            shop();
            } 

        }
        
    }
    
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }

    }

    endGame();

};

//function to end the entire game
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");
    
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
    
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else{
    
        window.alert("You've lost your robot in battle.");
    
    }
    
    //ask player they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
    
        //restart the game
        startGame();
    }
    
    else {
    
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");

    }

};

var shop = function () {
    
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    //switch for shop option prompt
    switch (shopOptionPrompt) {
        
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:

            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");

            //do nothing,so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;

    }
     

};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}


//FUNCTION TO SET NAME
var getPlayerName = function() {
    var name = "";

    while(name === "" || name === null) {
        name = prompt("What is you robot's name?");

    }

    console.log("You robot's + name");
    return name;

};

var playerInfo = {
    
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,

    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;

    },

    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refillin player's health by 20 for 7 dollars.");
                this.health += 20;
                this.money -= 7;
        }
    },

    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
                this.attack += 6;
                this.money -= 7;

    }
    else {
        window.alert("You don't have enough money!");

    }
  
  }

};


var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

/* END GAME INFORMATION / VARIABLES */


//start the game when the page loads
startGame();