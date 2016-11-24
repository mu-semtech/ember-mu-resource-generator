import Ember from 'ember';
import layout from '../templates/components/display-model-relationship';

export default Ember.Component.extend({
		layout: layout,
		tagName: 'dd',
		classNames: ['properties__data'],
		isBelongsTo: Ember.computed('kind', function () {
				return this.get('kind') === 'belongsTo';
		})
});
