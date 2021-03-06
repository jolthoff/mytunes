// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  template: _.template('<div class="track-info"><%= artist %> - <%= title %></div>'),

  initialize: function(params) {
    this.playerView = this.playerView || new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.queueView = new SongQueueView({collection: this.model.get('songQueue')});
    this.masterPlaylistView = new MasterPlaylistView({collection: this.model.get('playlists')})
    

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model) {
      this.playerView.setSong(model.get('currentSong'));
      this.$el.find('.track-info').remove();
      this.$el.prepend((this.template(this.model.get('currentSong').attributes)));
    }, this)

    
     this.model.on('change:queueList', function(model) {

      this.queueView.render();
    }, this)

  },

  render: function() {
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.queueView.$el,
      this.masterPlaylistView.$el
    ]);
  }

});
