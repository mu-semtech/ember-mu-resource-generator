/* jshint node: true */
'use strict';

module.exports = {
		name: 'ember-mu-resource-generator',
		isDevelopingAddon: function() {
				return true;
		},
    afterInstall: function(options) {
			updateRouter.call(this, 'add', options);
			this.addPackageToProject('ember-i18n', '~4.3');
			this.addPackageToProject('ember-promise-helpers', '~1.0');
      return this.addPackageToProject('ember-data-table', '~0.3');
			// Ember CLI expects to resolve a promise from these hooks when running the blueprint
  },

};
