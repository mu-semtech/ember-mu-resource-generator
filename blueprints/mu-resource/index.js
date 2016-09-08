/*jshint node:true*/
var entityToVariable = function(entityName) {
  var splits = entityName.split("-");
  return [splits[0]].concat(
    splits.slice(1).map(function(word) {
      return word[0].toUpperCase() + word.substring(1);
    })
  ).join("");
}

var entityPathVariable = function(entityName) {
  return entityName.replace(/-/g,"_");
}

module.exports = {
  description: 'Generates a full view for a resource backed by mu-resources.',

  locals: function(options) {
    console.log(options);
    var entityConfig = options.entity.options;
    var properties = Object.keys(entityConfig).map( function(key) {
      // name is the name of the relationship in the attributes
      // kind is the kind of resource which is connected
      // childVar is the name of the variable which you should use
      //   if you want to name the relationship or property as a
      //   variable.
      base = { name: key, kind: entityConfig[key], itemVar: entityToVariable(key) }
      return base;
    } );
    var attributes = properties.filter( function(prop) {
      return prop.kind != "hasMany" && prop.kind != "belongsTo";
    } );
    var relationships = properties.filter( function(prop) {
      return prop.kind == "hasMany" || prop.kind == "belongsTo";
    } );
    var belongsToRelationships = relationships.filter( function(relationship) {
      return relationship.kind == "belongsTo";
    } );
    var hasManyRelationships = relationships.filter( function(relationship) {
      return relationship.kind == "hasMany";
    } );
    

    return {
      attributes: attributes,
      relationships: relationships,
      belongsToRelationships: belongsToRelationships,
      hasManyRelationships: hasManyRelationships,
      entityName: options.entity.name,
      entityVar: entityToVariable(options.entity.name),
      entityPathVar: entityPathVariable(options.entity.name)
    };

    // // Return custom template variables here.
    // return {
    //   foo: options.entity.options.foo
    // };

    
  }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
