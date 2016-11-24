import Ember from 'ember';
import layout from '../templates/components/display-model-attributes';

export default Ember.Component.extend({
		layout: layout,
		classNames: ["properties"],
		fields: Ember.computed('model', 'klassOfModel', function () {
				var keys = [];
				Ember.get(this.get('klassOfModel'),'fields').forEach(
						function (val,k) {
								keys.addObject(k);
						});				
				return keys;
		}),
		parsedFields: Ember.computed('fields', function() {
      const fields = this.get('fields');
      if( Ember.typeOf( fields ) === 'string' ) {
        return fields.split(' ');
      } else {
        return fields || [];
      }
    }),
		props: Ember.computed('parsedFields','model', 'relationShipsByName', function() {
				var that = this;
				var props = Ember.Object.create();
				var transformedAttributes = this.get('transformedAttributes');
				var relationships = this.get('relationshipsByName');
				this.get('parsedFields').forEach(function(a) {
						var attributeName = a.dasherize().split('-').join(" ");
						if (!relationships.get(a)) {							
								props.set(attributeName, {
										valueComponent: "gr-" + transformedAttributes.get(a),
										content: that.get("model." + a)
								});
						}
				});
				return props;   
		}),
		rels: Ember.computed('parsedFields','model', 'relationShipsByName', function() {
				var that = this;
				var props = Ember.Object.create();
				var relationships = this.get('relationshipsByName');
				var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
				this.get('parsedFields').forEach(function(a) {
						var attributeName = a.dasherize().split('-').join(" ");
						var rel = relationships.get(a);
						if (rel) {
								props.set(attributeName, {
										kind: rel.kind,
										type: rel.type,
										itemRoute: inflector.pluralize(rel.type) + ".show",
									  promise: that.get("model."+a)
								});
						}
				});
				console.log(props);
				return props;   
		}),
		klassOfModel: Ember.computed('model', function () {
  		return this.get('model').constructor;
		}),
		relationshipsByName: Ember.computed('klassOfModel', function () {
				var klassOfModel = this.get('klassOfModel');
				if (Ember.typeOf(klassOfModel) === "undefined") {
						return new Map();
				}
				else {
						return Ember.get(this.get('klassOfModel'),'relationshipsByName');
				}
		}),
		transformedAttributes: Ember.computed('klassOfModel', function () {
				var klassOfModel = this.get('klassOfModel');
				if (Ember.typeOf(klassOfModel) === "undefined") {
						return new Map();
				}
				else {
						return Ember.get(this.get('klassOfModel'),'transformedAttributes');
				}
		})
		
});
