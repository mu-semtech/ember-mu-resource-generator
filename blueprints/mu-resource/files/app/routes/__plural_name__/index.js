import Ember from 'ember';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default Ember.Route.extend(DataTableRouteMixin, {
  modelName: '<%= entityName %>',
  queryParams: {
<%= relationships.map( function(relationship) {
  var name = relationship.name;
	return "    '"+ name + "': {refreshModel: true},"
}).join("\n") %>
  },
		mergeQueryOptions: function(params) {
    var mergedParams = {};
<%= relationships.map( function(relationship) {
		var name = relationship.name;
		var result = "if (! Ember.isEmpty(params['" + name + "'])) { \n" +
			           "    mergedParams['filter[" + name + "][id]'] = params['" + name + "'];\n" +
		             "}";
		return result;
}).join("\n") %>   
    return mergedParams;
  },
 // see https://guides.emberjs.com/v2.10.0/routing/query-params/#toc_sticky-query-param-values
 // sticky query params for relationships are undesirable at the moment	
 resetController(controller, isExiting, transition) {
    if (isExiting) {
      // isExiting would be false if only the route's model was changing
     controller.set('page', 0);
<%= relationships.map( function(relationship) {	return "    controller.set('" + relationship.name +"', '');"}).join("\n") %>
    }
  }		
});
