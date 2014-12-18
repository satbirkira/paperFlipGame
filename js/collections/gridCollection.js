var guessGame = guessGame || {};

guessGame.gridCollection = Backbone.Collection.extend({
    model: guessGame.paperModel,
    size: 4, //size x size matrix, use even number
    comparator: 'order',
    shuffleList : [],
    initialize: function ()
    {
        this.on("add", this.restrictCapacity);
        this.on("reset", this.fillAvailability);
        this.fillAvailability();
    },
    fillAvailability: function () {
        this.shuffleList = _.range(1, Math.pow(this.size, 2)+1);
        this.shuffleList = _.shuffle(this.shuffleList);
        //print answer key to console
        var answersLeft = this.shuffleList;
        console.log("Answer Key");
        while(answersLeft.length !== 0)
        {
            var curRow = _.first(answersLeft, this.size);
            curRow = _.map(curRow, function(num){ return this.displayNumberCalc(num); }, this);
            console.log(JSON.stringify(curRow));
            answersLeft = _.rest(answersLeft, this.size);
        }
    },
    restrictCapacity: function (paper) {
        var max = Math.pow(this.size, 2);
        if(this.length > max)
        {
            this.pop(paper);
            console.log("Capacity already reached. Cur"+ this.length +"/"+ max);
        }
    },
    takeNum : function () {
        //change this to use a list that you pop
        var firstNum = _.first(this.shuffleList);
        this.shuffleList = _.without(this.shuffleList, firstNum);
        return firstNum;
    },
    nextRow : function () {
        return this.length ? parseInt(this.length / this.size) + 1 : 1;
    },
    nextCol : function () {
        return this.length ? parseInt(this.length % this.size) + 1 : 1;
    },
    displayNumber: function(model){
        var modelNum = model.get("number");
        return this.displayNumberCalc(modelNum);
    },
    displayNumberCalc : function(num){
        var halfNum = Math.pow(this.size, 2)/2;
        return num > halfNum ?
            num % halfNum +1 : num;
        //In 2x2: 1 returns 1, 2 returns 2, 3 returns 2, 4 returns 1
    },
    getFlipped : function() {
        return this.where({flipped: true})
    },
    getNotFlipped : function (){
        return this.where({flipped: false})
    }     
});

guessGame.solidGridCollection = new guessGame.gridCollection;