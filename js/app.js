var guessGame = guessGame || {};

guessGame.App = function(){
    this.start = function(){
        var play = new guessGame.appView;
    };
};
    
$(function(){
    var game = new guessGame.App();
    game.start();
});

