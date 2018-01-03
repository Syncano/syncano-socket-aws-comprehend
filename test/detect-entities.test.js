import { assert } from 'chai';
import { run } from 'syncano-test';
import { config } from './utils/helpers';

describe('detect-entities', () => {
  it('should return return information about entities of input text supplied', (done) => {
    const args = {
      LanguageCode: 'en',
      Text: 'Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist. ' +
      'Einstein developed the theory of relativity, one of the two pillars of modern physics ' +
      '(alongside quantum mechanics)'
    };
    run('detect-entities', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'Entities');
        assert.property(res.data.Entities[0], 'Text');
        assert.property(res.data.Entities[0], 'Type');
        assert.isAbove(res.data.Entities.length, 2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if argument "Text" property is empty', (done) => {
    const invalidArgs = {
      LanguageCode: 'en',
      Text: ''
    };
    run('detect-entities', {args: invalidArgs, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'ValidationException');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
