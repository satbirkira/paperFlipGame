var guessGame = guessGame || {};

guessGame.appView = Backbone.View.extend({
    el: $("#grid"),
    initialize: function () {
        this.collection = guessGame.solidGridCollection;
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'change', this.checkPaperStatus);
        this.render();
        this.addPaper();
    },
    restartGame: function (){
        this.collection.size *= 2;
        this.collection.reset();
        this.render();
        this.addPaper();
    },
    checkPaperStatus : function (paper) {
        //if the container has exactly two flipped,
        //destory them if need be
        var flipped = this.collection.getFlipped();
        if(flipped.length == 2)
        {
               var modelA = flipped[0];
               var modelB = flipped[1];
               var displayA = this.collection.displayNumber(modelA);
               var displayB = this.collection.displayNumber(modelB);
            
               var performAction = function (that) {
                   if(displayA === displayB)
                   {
                       modelA.destroy();
                       modelB.destroy();
                   }
                   else
                   {
                       //unflip all currently flipped
                       _.invoke(flipped, 'flip');
                   }
                   if(!that.collection.length)
                   {
                       alert("Level Complete");
                       that.restartGame();
                   }
               };
              _.delay(performAction, 500, this);
        }
        else if(flipped.length > 2)
        {
            _.invoke(flipped, 'flip');
        }
    },
    render: function (){
        //make grid
        this.$el.html("");
        var gridSize = this.collection.size;
        for(var row = 1; row <= gridSize; row++)
        {
            //create row
            this.$el.append("<div class='row' id='"+row+"'></div>");
            //add col
            for(var col = 1; col <= gridSize; col++)
            {
                //add empty columns
                $("#"+row).append("<span id='"+row+"-"+col+"' class='col'></span>");
            }
        }
    },
    addPaper: function (){
        var gridSize = this.collection.size;
        for(var row = 1; row <= gridSize; row++)
        {
            for(var col = 1; col <= gridSize; col++)
            {
                this.collection.add(new guessGame.paperModel);
            }
        }
    },
    addOne: function (paper) {
        //create view for model
        var view = new guessGame.paperView({model: paper});
        var col = paper.get("column");
        var row = paper.get("row");
        $("#"+row+"-"+col).html(view.render().el);
    }
});