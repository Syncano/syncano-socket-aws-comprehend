import { assert } from 'chai';
import { run } from 'syncano-test';
import { config } from './utils/helpers';

describe('detect-dominant-language', () => {
  it('should return dominant language of input text supplied', (done) => {
    const args = {
      Text: 'Que vous êtes joli ! Que vous me semblez beau. Bonjour monsieur Emmanuel, can we ' +
      'continue the discussion we had yesterday?'
    };
    run('detect-dominant-language', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'Languages');
        assert.property(res.data.Languages[0], 'LanguageCode');
        assert.propertyVal(res.data.Languages[0], 'LanguageCode', 'fr');
        assert.strictEqual(res.data.Languages.length, 2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if "Text" parameter is empty', (done) => {
    const invalidArgs = {
      Text: ''
    };
    run('detect-dominant-language', { args: invalidArgs, config })
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
