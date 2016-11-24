import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-model-hasmany-relationship', 'Integration | Component | display model hasmany relationship', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{display-model-hasmany-relationship}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#display-model-hasmany-relationship}}
      template block text
    {{/display-model-hasmany-relationship}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
