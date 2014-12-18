var guessGame = guessGame || {};

guessGame.paperView = Backbone.View.extend({
    tagName: 'a',
    events: {
    "click" : "flip"
    },
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function () {
        if (this.model.get("flipped"))
        {
            this.$el.text(guessGame.solidGridCollection.displayNumber(this.model));
            this.$el.addClass("flipped");
        }
        else
        {
            this.$el.text("_?_");
            this.$el.removeClass("flipped");
        }
        return this;
    },
    flip: function()
    {
        this.model.flip();
    }
    
});