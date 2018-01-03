import { assert } from 'chai';
import { run } from 'syncano-test';
import { config, TOPIC_JOB_ID } from './utils/helpers';

describe('describe-topics-detection-job', () => {
  it('should return properties associated with a topic detection job if valid parameters supplied',
    (done) => {
      const args = { JobId: TOPIC_JOB_ID };
      run('describe-topics-detection-job', {args, config})
        .then((res) => {
          assert.propertyVal(res, 'code', 200);
          assert.property(res.data, 'TopicsDetectionJobProperties');
          assert.property(res.data.TopicsDetectionJobProperties, 'JobStatus');
          assert.property(res.data.TopicsDetectionJobProperties, 'JobName');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  it('should fail if argument "JobId" property is empty', (done) => {
    const invalidArgs = { JobId: '' };
    run('describe-topics-detection-job', {args: invalidArgs, config})
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
