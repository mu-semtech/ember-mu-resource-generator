import Ember from 'ember';
import DisplayModelAttributes from 'ember-mu-resource-generator/components/display-model-attributes';

export default DisplayModelAttributes.extend({
  // specify the attributes you would like displayed
  // by default retrieves all attributes
  // uses a component based on the type of the attribute (gr-{type})
  // example:
  // props: Ember.Object.create( {
  //        attributeName: {
	//				  valueComponent: "gr-string"
	//				  content: model.get(attributeName)
  //        }
  // })

  // specify the relationships you would like displayed
  // by default retrieves all relationships
  // example:
  // rels: Ember.Object.create({
  //       attributeName: {
  //     		kind: 'belongsTo',
  // 		  	itemRoute: "myRoute.show",
  // 			  promise: that.get("model.myRelationship")
  //     }
  // })
});
