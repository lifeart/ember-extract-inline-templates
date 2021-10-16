//@ts-nocheck
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';

module('Integration | Component | panel-query-group/panel-query-item/label', function (hooks: any) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert: any) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{panel-query-group/panel-query-item/label}}`);
    assert.dom().hasText('<NoGroupProvided>');
  });

  test('it can lookup data for optionModelType=refDataType', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('refDataTypeById', () => {
      return Promise.resolve({ label: 'foo' });
    });
    const condition = {
      value: {
        uid: '42',
        term: null
      }
    };
    this.setProperties({ condition });
    await render(
      hbs`{{panel-query-group/panel-query-item/label  condition=this.condition optionModelType="refDataType"}}`
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('foo');
  });

  test('it can lookup data for optionModelType=crop', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('cropTypeById', () => {
      return Promise.resolve({ label: 'foo' });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };
    this.setProperties({ condition });
    await render(hbs`{{panel-query-group/panel-query-item/label condition=this.condition optionModelType="crop"}}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('foo');
  });
  test('it can lookup data for optionModelType=hydratype', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('hydraTypeById', () => {
      return Promise.resolve({ label: 'foo' });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };
    this.setProperties({ condition });
    await render(
      hbs`{{panel-query-group/panel-query-item/label condition=this.condition optionModelType="hydratype"}}`
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('foo');
  });

  test('it can lookup data for optionModelType=locationPart', async function (assert: any) {
    const store = this.owner.lookup('service:store');

    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('locationTypeById', () => {
      return Promise.resolve({ label: 'foo' });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };

    this.set(
      'model',
      run(() =>
        store.createRecord('meta-attribute/enum', {
          attributeName: 'country',
          modelName: 'trial'
        })
      )
    );
    this.setProperties({ condition });
    await render(
      hbs`{{panel-query-group/panel-query-item/label model=model condition=this.condition optionModelType="locationPart"}}`
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('foo');
  });

  test('it can lookup data for optionModelType=cro', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('organizationById', () => {
      return Promise.resolve({ label: 'foo', name: 'cro1' });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };

    this.setProperties({ condition });
    await render(hbs`{{panel-query-group/panel-query-item/label condition=this.condition optionModelType="cro"}}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('cro1');
  });

  test('it can lookup data for optionModelType=person', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('personById', () => {
      return Promise.resolve({
        label: 'foo',
        firstName: 'Jane',
        lastName: 'Doe'
      });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };

    this.setProperties({ condition });
    await render(hbs`{{panel-query-group/panel-query-item/label condition=this.condition optionModelType="person"}}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('Jane Doe');
  });

  test('it can lookup data for optionModelType=formulation', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('formulationById', () => {
      return Promise.resolve({ label: 'foo' });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };

    this.setProperties({ condition });
    await render(
      hbs`{{panel-query-group/panel-query-item/label condition=this.condition optionModelType="formulation"}}`
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('foo');
  });

  test('it can lookup data for optionModelType=activeIngredient', async function (assert: any) {
    const remoteDataProvider = this.owner.lookup('service:remoteDataProvider');
    assert.expect(1);
    remoteDataProvider.set('activeIngredientById', () => {
      return Promise.resolve({ label: 'foo' });
    });
    const condition = {
      value: {
        uid: '42'
      }
    };

    this.setProperties({ condition });
    await render(
      hbs`{{panel-query-group/panel-query-item/label condition=this.condition optionModelType="activeIngredient"}}`
    );
    await new Promise((resolve) => setTimeout(resolve, 20));
    assert.dom('.ui.label').hasText('foo');
  });
});
