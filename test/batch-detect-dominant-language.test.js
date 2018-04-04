import { assert } from 'chai';
import { run } from '@syncano/test';
import { config } from './utils/helpers';

describe('batch-detect-dominant-language', () => {
  it('should return dominant languages of array of text supplied', (done) => {
    const args = {
      TextList: [
        'Syncano is a development platform for building more, faster by ' +
        'leveraging existing backend code.',
        'Maître Corbeau, sur un arbre perché, Tenait en son bec un fromage. Maître Renard, ' +
        'par l’odeur alléché, Lui tint à peu près ce langage'
      ]
    };
    run('batch-detect-dominant-language', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'ResultList');
        assert.property(res.data.ResultList[0].Languages[0], 'LanguageCode');
        assert.propertyVal(res.data.ResultList[0].Languages[0], 'LanguageCode', 'en');
        assert.strictEqual(res.data.ResultList.length, 2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if argument property "TextList" is empty array', (done) => {
    const invalidArgs = {
      TextList: []
    };
    run('batch-detect-dominant-language', { args: invalidArgs, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'InvalidRequestException');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
