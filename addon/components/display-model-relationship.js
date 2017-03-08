import Ember from 'ember';
import layout from '../templates/components/display-model-relationship';

export default Ember.Component.extend({
		layout: layout,
		tagName: 'dd',
		classNames: ['properties__data'],
		isBelongsTo: Ember.computed('kind', function () {
				return this.get('kind') === 'belongsTo';
		}),
	  relationFilter: Ember.computed('relationFilterKey','relationFilterValue', function() {
  		var obj = Ember.Object.create();
	    obj.set(this.get('relationFilterKey'), this.get('relationFilterValue'));
    	return obj;
	 }),		
});
