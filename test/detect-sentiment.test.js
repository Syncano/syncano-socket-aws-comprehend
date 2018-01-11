import { assert } from 'chai';
import { run } from 'syncano-test';
import { config } from './utils/helpers';

describe('detect-sentiment', () => {
  it('should return an inference of the prevailing sentiment in text', (done) => {
    const args = {
      LanguageCode: 'en',
      Text: 'Syncano helps the startups in our Fintech and Insurtech accelerator programs to ' +
      'reach product market fit faster'
    };
    run('detect-sentiment', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'Sentiment');
        assert.property(res.data, 'SentimentScore');
        assert.property(res.data.SentimentScore, 'Positive');
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
    run('detect-sentiment', { args: invalidArgs, config })
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
