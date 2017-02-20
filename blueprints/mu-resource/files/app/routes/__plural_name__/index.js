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
    var mergedParams = {
<%= relationships.map( function(relationship) {
  var name = relationship.name;
	return "    'filter[" + name + "][id]': params['" + name + "'],";
}).join("\n") %>
    };
    return mergedParams;
  },
});
