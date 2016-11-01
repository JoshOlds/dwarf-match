;(function () {
  angular.module('dwarfMatch')
    .component('gameComponent', {
      controller: GameController,
      templateUrl: 'app/components/game/game.html'
    })

  function GameController ($timeout, GameService) {
    var gc = this

    // This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    gc.deck = GameService.getDeck(1)

    // Create two card variables. These will be responsible
    // for keeping track of our selections as we click cards.

    var card1 = {};
    var card2 = {};
    var lock = false;

    // Next we need to initate a few more variables on gc for later use
    // Let's add variables for tracking the number of attempts (pairs flipped),
    // for the total number of correct attempts (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names

    this.attempts = 0;
    this.pairs = 0;
    this.victory = false;
    this.range = [1,2,3,4,5];
    this.multiplier = 1;

    // Next write a selectCard function on gc that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md

    this.selectCard = function selectCard(card){
      if(lock || card.active){return;}
      if(!card1.title){
        card1 = card;
        card1.active = true;
        card1.show = true;
        return;
      }
      if(!card2.title){
        card2 = card;
        card2.active = true;
        card2.show = true;
        if(this.isMatch(card1, card2)){this.resetCards(0);}
        else{this.resetCards(1000);}
        return;
      }
      this.resetCards(1000);
    }

    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts

    this.resetCards = function resetCards(time){
      lock = true;
      $timeout(function(){
        if(!card1.found){
          card1.show = false;
          card1.active = false;
        }
        if(!card1.found){
          card2.show = false;
          card2.active = false;
        }
        card1 = {};
        card2 = {};
        lock = false;
      }, time)
      this.attempts++;  
    }

    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md

    this.isMatch = function isMatch(card1, card2){
      if( card1.title == card2.title && card1.color == card2.color){
        card1.found = true;
        card2.found = true;
        this.pairs++;
        this.checkVictory();
        return true;
      }
      return false;
    }

    // Finally, write a local checkVictory function that will set gc.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at gc.deck. When you're done
    // refer back to readme.md

    this.checkVictory = function checkVictory(){
      if(this.pairs >= (this.deck.length / 2)){
        this.victory = true;
        return true;
      }
      this.victory = false;
      return false;
    }

    // Bonus Challenge: Write a function on gc that can reset the game and add a button that calls it
    this.restartGame = function restartGame(){
      this.deck = [];
      this.deck = GameService.getDeck(this.multiplier || 1);
      this.pairs = 0;
      this.attempts = 0;
      this.victory = false;
      card1 = {};
      card2 = {};
      lock = false;
    }
  }
}())
