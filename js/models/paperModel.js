var guessGame = guessGame || {};

guessGame.paperModel = Backbone.Model.extend({
    defaults: function () {
        return {
            row: guessGame.solidGridCollection.nextRow(),
            column: guessGame.solidGridCollection.nextCol(),
            number : guessGame.solidGridCollection.takeNum(),
            flipped: false
        }
    },
    initialize: function (){
        //console.log("Paper Model Created: Num "+ this.get("number"));
    },
    flip: function () {
        this.set("flipped", !this.get("flipped"));
    }
});