import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').createRecord('<%= entityName %>');
  },
  actions: {
    save(model) {
      var self = this;
      return model.save().then( function(model) {
        self.transitionTo( "<%= entityName %>", model );
      }).catch( function() {
        alert("Creation of <%= entityName %> failed");
      });
    }
  }
});
