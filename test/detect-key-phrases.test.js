import { assert } from 'chai';
import { run } from '@syncano/test';
import { config } from './utils/helpers';

describe('detect-key-phrases', () => {
  it('should return information about key noun phrases detected in text', (done) => {
    const args = {
      LanguageCode: 'en',
      Text: 'Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist. ' +
      'Einstein developed the theory of relativity, one of the two pillars of modern physics ' +
      '(alongside quantum mechanics)'
    };
    run('detect-key-phrases', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'KeyPhrases');
        assert.property(res.data.KeyPhrases[0], 'Text');
        assert.property(res.data.KeyPhrases[0], 'Score');
        assert.isAbove(res.data.KeyPhrases.length, 2);
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
    run('detect-key-phrases', { args: invalidArgs, config })
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
