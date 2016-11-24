import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gr-language-string-set', 'Integration | Component | gr language string set', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gr-language-string-set}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gr-language-string-set}}
      template block text
    {{/gr-language-string-set}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
