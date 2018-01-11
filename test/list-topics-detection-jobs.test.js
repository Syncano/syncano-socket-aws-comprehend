import { assert } from 'chai';
import { run } from 'syncano-test';
import { config } from './utils/helpers';

describe('list-topics-detection-jobs', () => {
  it('should return list of the topic detection jobs submitted', (done) => {
    const args = {
      Filter: {
        JobStatus: 'FAILED'
      },
      MaxResults: 10
    };
    run('list-topics-detection-jobs', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'TopicsDetectionJobPropertiesList');
        assert.isArray(res.data.TopicsDetectionJobPropertiesList);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should fail if invalid parameter supplied', (done) => {
    const invalidArgs = {
      LanguageCode: 'en'
    };
    run('list-topics-detection-jobs', { args: invalidArgs, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.property(res.data, 'message');
        assert.propertyVal(res.data, 'code', 'UnexpectedParameter');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
