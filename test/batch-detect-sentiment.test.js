import { assert } from 'chai';
import { run } from 'syncano-test';
import { config } from './utils/helpers';

describe('batch-detect-sentiment', () => {
  it('should return an inference of the prevailing sentiment for each document in a batch of' +
    'documents', (done) => {
    const args = {
      LanguageCode: 'en',
      TextList: [
        'Syncano helps the startups in our Fintech and Insurtech accelerator programs to reach ' +
        'product market fit faster',
        'Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist. ' +
        'Einstein developed the theory of relativity, one of the two pillars of modern physics '
      ]
    };
    run('batch-detect-sentiment', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'ResultList');
        assert.property(res.data, 'ErrorList');
        assert.property(res.data.ResultList[0], 'Sentiment');
        assert.property(res.data.ResultList[0], 'SentimentScore');
        assert.property(res.data.ResultList[0].SentimentScore, 'Positive');
        assert.strictEqual(res.data.ResultList.length, 2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if argument without "TextList" parameter', (done) => {
    const invalidArgs = {
      LanguageCode: 'en'
    };
    run('batch-detect-sentiment', {args: invalidArgs, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'MissingRequiredParameter');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
