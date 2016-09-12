import DS from 'ember-data';

export default DS.Model.extend({
  <%=
    attributes.map( function(attribute) {
      return attribute.itemVar + ": DS.attr(\"" + attribute.kind + "\"),"
    }).join("\n  ")
  %>
  <%=
    relationships.map( function(relationship) {
      if( relationship.kind == "hasMany" ){
        return relationship.itemVar + ": DS.hasMany(\"" + relationship.name + "\"),";
      } else {
        return relationship.itemVar + ": DS.belongsTo(\"" + relationship.name + "\"),";
      }
    }).join("\n  ")
  %>
});
