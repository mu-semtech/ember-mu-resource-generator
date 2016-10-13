import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('<%= entityName %>');
  },
  actions: {
    cancel(model) {
      model.rollbackAttributes();
      this.transitionTo("<%= entityName %>", model);
    },
    save(model) {
      var self = this;
      model.save().then( function() {
        self.transitionTo("<%= entityName %>", model);
      }).catch( function() {
        alert("Could not save <%= entityName %>");
      });
    }
  }
});
