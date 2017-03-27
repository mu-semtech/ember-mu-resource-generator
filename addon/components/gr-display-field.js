import Ember from 'ember';
import layout from '../templates/components/gr-display-field';

export default Ember.Component.extend({
		layout,
		displayComponent: Ember.computed('model','field', function() {
				if (!this.get('field') || !this.get('model')) return false;
				var constructor = this.get('model').constructor;
				var transformedAttributes = Ember.get(constructor, 'transformedAttributes');
        var fieldType = transformedAttributes.get(this.get('field'));
				if (Ember.typeOf(fieldType) === "undefined") {
						fieldType = "string";
						console.log('no fieldtype found for ' + this.get('field'));
				}
				return "gr-" + fieldType;
		}),
});
