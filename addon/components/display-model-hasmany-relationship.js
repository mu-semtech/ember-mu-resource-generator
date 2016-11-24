import Ember from 'ember';
import layout from '../templates/components/display-model-hasmany-relationship';

export default Ember.Component.extend({
		layout: layout,
		classNames: ['link-list'],
		tagName: 'ul'
});
