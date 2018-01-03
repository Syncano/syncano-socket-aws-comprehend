import 'dotenv/config';

const config = () => {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
  return { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION };
};

const {
  AWS_COMPREHEND_ROLE_ARN, AWS_JOB_OUTPUT_BUCKET, TOPIC_JOB_ID, HOST_URL, MOCK_METHOD
} = process.env;

export {
  config,
  AWS_COMPREHEND_ROLE_ARN,
  AWS_JOB_OUTPUT_BUCKET,
  TOPIC_JOB_ID,
  HOST_URL,
  MOCK_METHOD
};
