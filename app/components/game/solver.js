angular.module('dwarfMatch')
    .component('solver', {
        require: {
            'parent': '^gameComponent'
        },
        controller: function ($timeout) {

            this.seenDeck = [];
            this.active = false;

            this.run = function run() {
                this.checkCard(0);
            }

            this.runPerfect = function runPerfect(){
                this.parent.deck.forEach((item, index) =>{
                    this.seenDeck.push({index: index, card: item})
                })
                this.checkCard(0);
            }



            // this.checkCard = function checkCard(index){
            //     if(this.parent.victory){return;}
            //     this.active = !this.active;
            //     var newCard = {index: index, card: this.parent.selectCard(this.parent.deck[index])};
            //     this.seenDeck.push(newCard);
            //     var matchIndex = this.findMatch(newCard);
            //     if(matchIndex != -1){
            //         if(this.active){
            //             this.parent.selectCard(this.parent.deck[matchIndex]);
            //             $timeout(() => {this.checkCard(index + 1)}, 1500);
            //             return;
            //         }else{
            //             $timeout(() => {
            //                 this.parent.selectCard(this.parent.deck[index]);
            //                 this.parent.selectCard(this.parent.deck[matchIndex]);
            //             }, 1500);
            //             $timeout(() => {this.checkCard(index + 1)}, 3000);
            //             return;
            //         }
            //     }
            //     if(this.active){
            //         $timeout(() => {this.checkCard(index + 1)}, 250);
            //     }else{
            //         $timeout(() => {this.checkCard(index + 1)}, 1500);
            //     }

            // }

            this.checkCard = function checkCard(index) {
                if(this.parent.deck[index].show){
                    $timeout(() => { this.checkCard(index + 1) }, 1);
                    return;
                }
                if (this.parent.victory) { 
                    this.seenDeck = [];
                    return;
                }
                var newCard = { index: index, card: this.parent.selectCard(this.parent.deck[index]) };
                this.seenDeck.push(newCard);
                var matchIndex = this.findMatch(newCard);
                if (matchIndex > -1) {
                    $timeout(() => { this.parent.selectCard(this.parent.deck[matchIndex]) }, 200);
                    //$timeout(() => { this.checkCard(index + 1) }, 1700);
                    $timeout(() => { this.checkCard(index + 1) }, 600);
                    return;
                }

                $timeout(() => {
                    index++;
                    newCard = { index: index, card: this.parent.selectCard(this.parent.deck[index]) };
                    this.seenDeck.push(newCard);
                    matchIndex = this.findMatch(newCard);
                    if (matchIndex > -1 && matchIndex != (index - 1)) {
                        $timeout(() => { this.parent.selectCard(this.parent.deck[index]) }, 1500);
                        $timeout(() => { this.parent.selectCard(this.parent.deck[matchIndex]) }, 1700);
                        $timeout(() => { this.checkCard(index + 1) }, 2100);
                        //$timeout(() => { this.checkCard(index + 1) }, 3200);
                        return;
                    }

                    $timeout(() => { this.checkCard(index + 1) }, 1500);
                }, 200)


            }

            this.findMatch = function findMatch(card) {
                var index = -1;
                this.seenDeck.forEach(item => {
                    if (item.card.title == card.card.title && item.card.color == card.card.color && item.index != card.index) {
                        index = item.index;
                    }
                })
                return index;
            }

        },
        template: `
            <button ng-click="$ctrl.run()">run solver</button>
            <button ng-click="$ctrl.runPerfect()">run Perfect Solver</button>
        `
    })