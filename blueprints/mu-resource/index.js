var fs          = require('fs-extra');
var path        = require('path');
var chalk       = require('chalk');
var EmberRouterGenerator = require('ember-router-generator');
var Inflector = require('ember-inflector-node-shim');

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
    // console.log(options);
    var entityConfig = options.entity.options;
    var properties = Object.keys(entityConfig).map( function(key) {
      // name is the name of the relationship in the attributes
      // kind is the kind of resource which is connected
      // childVar is the name of the variable which you should use
      //   if you want to name the relationship or property as a
      //   variable.
      base = { name: key, kind: entityConfig[key], itemVar: entityToVariable(key), itemVarSingle: Inflector.singularize(entityToVariable(key)) }
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
      entitiesName: Inflector.pluralize(options.entity.name),
      entityVar: entityToVariable(options.entity.name),
      entityPathVar: entityPathVariable(options.entity.name)
    };

    // // Return custom template variables here.
    // return {
    //   foo: options.entity.options.foo
    // };

    
  },
  fileMapTokens: function(options) {
			return {
					__plural_name__: function(options) {
							return options.locals.entitiesName
					}
			}
	},
  afterInstall: function(options) {
			updateRouter.call(this, 'add', options);
			this.addPackageToProject('ember-promise-helpers', '~1.0');
      return this.addPackageToProject('ember-data-table', '~0.3');
			// Ember CLI expects to resolve a promise from these hooks when running the blueprint
  },

  afterUninstall: function(options) {
    return updateRouter.call(this, 'remove', options);
  }

};

function updateRouter(action, options) {
  var entity = options.entity;
  var actionColorMap = {
    add: 'green',
    remove: 'red'
  };
  var color = actionColorMap[action] || 'gray';
  var entitiesName = Inflector.pluralize(entity.name)
  var routes = [
    { name: entitiesName, options: {} },
    { name: entitiesName + '/new', options: {} },
    { name: entitiesName + '/show', options: { path: ':id' } },
    { name: entitiesName + '/edit', options: { path: ':id/edit' } }
  ];
  var self = this;
  this.ui.writeLine('updating router');
  routes.forEach(function(route) {
    writeRoute(action, route.name, route.options, options);
    
    self._writeStatusToUI(chalk[color], action + ' route', route.name);
  });

}

function findRouter(options) {
  var routerPathParts = [options.project.root];

  if (options.dummy && options.project.isEmberCLIAddon()) {
    routerPathParts = routerPathParts.concat(['tests', 'dummy', 'app', 'router.js']);
  } else {
    routerPathParts = routerPathParts.concat(['app', 'router.js']);
  }

  return routerPathParts;
}

function writeRoute(action, name, routeOptions, options) {
  var routerPath = path.join.apply(null, findRouter(options));
  var source = fs.readFileSync(routerPath, 'utf-8');

  var routes = new EmberRouterGenerator(source);
  var newRoutes = routes[action](name, routeOptions);

  fs.writeFileSync(routerPath, newRoutes.code());
}
