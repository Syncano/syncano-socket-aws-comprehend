import { assert } from 'chai';
import { run } from 'syncano-test';
import { config } from './utils/helpers';

describe('batch-detect-entities', () => {
  it('should return information about entities of batch of documents', (done) => {
    const args = {
      LanguageCode: 'en',
      TextList: [
        'Syncano is a development platform for building more, faster by leveraging existing ' +
        'backend code.',
        'Einstein (14 March 1879 – 18 April 1955) was a German-born theoretical physicist. ' +
        'Einstein developed the theory of relativity, one of the two pillars of modern physics ' +
        '(alongside quantum mechanics)'
      ]
    };
    run('batch-detect-entities', {args, config})
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'ResultList');
        assert.property(res.data.ResultList[0].Entities[0], 'Text');
        assert.property(res.data.ResultList[0].Entities[0], 'Type');
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
    run('batch-detect-entities', {args: invalidArgs, config})
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
