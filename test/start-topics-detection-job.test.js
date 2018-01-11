import { assert } from 'chai';
import { run } from 'syncano-test';
import nock from 'nock';
import request from 'supertest';
import {
  config, AWS_COMPREHEND_ROLE_ARN, AWS_JOB_OUTPUT_BUCKET, HOST_URL, MOCK_METHOD
} from './utils/helpers';

const args = {
  DataAccessRoleArn: `${AWS_COMPREHEND_ROLE_ARN}`,
  InputDataConfig: {
    InputFormat: 'ONE_DOC_PER_LINE',
    S3Uri: 's3://public-sample-eu-west-1'
  },
  JobName: 'comprehend-job-test',
  OutputDataConfig: {
    S3Uri: `s3://${AWS_JOB_OUTPUT_BUCKET}`
  }
};

describe('start-topics-detection-job', () => {
  it('should Starts an asynchronous topic detection job if valid parameters supplied', (done) => {
    nock(HOST_URL)
      .post(`${MOCK_METHOD}`, args)
      .reply(200, {
        JobId: '710268e25918c71fd575e6891d7aa618',
        JobStatus: 'SUBMITTED'
      });
    request(`${HOST_URL}`)
      .post(`${MOCK_METHOD}`)
      .send(args)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.property(res.body, 'JobId');
        assert.property(res.body, 'JobStatus');
        assert.propertyVal(res.body, 'JobStatus', 'SUBMITTED');
        done();
      });
  });

  it('should fail if argument "DataAccessRoleArn" property is empty', (done) => {
    const invalidArgs = { ...args, DataAccessRoleArn: '' };
    run('start-topics-detection-job', { args: invalidArgs, config })
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
