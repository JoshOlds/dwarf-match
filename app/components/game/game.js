;(function () {
  angular.module('dwarfMatch')
    .component('gameComponent', {
      controller: GameController,
      templateUrl: 'app/components/game/game.html'
    })

  function GameController ($timeout, GameService) {
    var gc = this

    // This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    gc.deck = GameService.getDeck()

    // Create two card variables. These will be responsible
    // for keeping track of our selections as we click cards.

    var card1 = {};
    var card2 = {};

    // Next we need to initate a few more variables on gc for later use
    // Let's add variables for tracking the number of guesses (pairs flipped),
    // for the total number of correct guesses (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names

    var guesses = 0;
    var pairs = 0;
    var victory = false;
    var lock = false;

    // Next write a selectCard function on gc that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md

    this.selectCard = function selectCard(card){
      if(lock){return;}
      if(!card1.title){
        card1 = card;
        card.show = true;
        return;
      }
      if(!card2.title){
        card2 = card;
        card.show = true;
        this.isMatch(card1, card2);
        this.resetCards();
        return;
      }
      this.resetCards();
    }

    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts

    this.resetCards = function resetCards(){
      lock = true;
      $timeout(function(){
        card1.show = false;
        card2.show = false;
        card1 = {};
        card2 = {};
        lock = false;
      }, 1000)
      guesses++;  
    }

    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md

    this.isMatch = function isMatch(card1, card2){
      if( card1.title == card2.title){

        pairs++;
        return true;
      }
      return false;
    }

    // Finally, write a local checkVictory function that will set gc.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at gc.deck. When you're done
    // refer back to readme.md

    this.victory = function victory(){
      if(pairs >= deck.length){
        return true;
      }
      return false;
    }

    // Bonus Challenge: Write a function on gc that can reset the game and add a button that calls it

  }
}())
