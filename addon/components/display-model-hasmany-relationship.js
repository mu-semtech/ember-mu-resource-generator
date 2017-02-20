import Ember from 'ember';
import layout from '../templates/components/display-model-hasmany-relationship';

export default Ember.Component.extend({
    routing: Ember.inject.service('-routing'),
		layout: layout,
		classNames: ['link-list'],
		tagName: 'ul',
		actions: {
				// using an action because link-to query-params helper does not accept a hash
				filterRelation: function() {
						this.get('routing').transitionTo(this.get('relationRoute'), [], this.get('relationFilter'))
				}
		}
});
