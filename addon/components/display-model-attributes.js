import Ember from 'ember';
import layout from '../templates/components/display-model-attributes';

export default Ember.Component.extend({
		layout: layout,
		classNames: ["properties"],
		// a list of all attributes in the model, you can override this with a specific list
		fields: Ember.computed('model', 'klassOfModel', function () {
				var keys = [];
				Ember.get(this.get('klassOfModel'),'fields').forEach(
						function (val,k) {
								keys.addObject(k);
						});
				return keys;
		}),
		// a list of all attributes in the model, allows for 'fields' to be a string
		parsedFields: Ember.computed('fields', function() {
      const fields = this.get('fields');
      if( Ember.typeOf( fields ) === 'string' ) {
        return fields.split(' ');
      } else {
        return fields || [];
      }
    }),

		/*
		 * returns a hash describing the requested attributes of the provided model
     * e.g.
		 * {
		 *   title:
		 *     {
		 *       valueComponent: "gr-string", // component used for display
		 *       content: "a title",          // value of the attribute
		 *     },
		 * }
		 */
	  props: Ember.computed('parsedFields','model', 'relationshipsByName', function() {
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

		/*
		 * returns a hash describing the relationships linked to the provided model
     * e.g
     * {
     *   relationShipName: {
     *     kind: "has-many",                 // kind of the relationship (hasmany or belongsto)
		 *		 itemRoute: "addresses.show",      // route to a specific item in the relationship
		 *     itemListRoute: "addresses.index", // route to a list of items in the relationship
		 *     itemListFilter:                   // filter applied to the above list
		 *                     { filter[postcode][id]: 'c6633b87-e4ba-4f73-b116-020ee2ca912c' }
     *   },
		 *   ...
		 *}
		 */
		rels: Ember.computed('parsedFields','model', 'relationshipsByName', function() {
				var that = this;
				var props = Ember.Object.create();
				var relationships = this.get('relationshipsByName');
				var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
				var filterKey = this.get('model.constructor.modelName');
				var itemListFilter = {};
				itemListFilter[filterKey] = this.get('model.id');
				this.get('parsedFields').forEach(function(a) {
						var attributeName = a.dasherize().split('-').join(" ");
						var rel = relationships.get(a);
						if (rel) {
								props.set(attributeName, {
										kind: rel.kind,
										itemRoute: inflector.pluralize(rel.type) + ".show",
										itemListRoute: inflector.pluralize(rel.type) + ".index",
										itemListFilter: itemListFilter,
									  promise: that.get("model."+a)
								});
						}
				});
				return props;
		}),

		/* supporting functions */
		
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
		}),
});
