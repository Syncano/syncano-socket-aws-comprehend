import AWS from 'aws-sdk';

/**
 * aws comprehend config
 * @param {object} awsParameters
 * @returns {Comprehend}
 */
const awsComprehendConfig = (awsParameters) => {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = awsParameters;
  return new AWS.Comprehend({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  });
};

/**
 * Do the request for endpoint
 * @param {string} endpoint
 * @param {object} params
 * @param {object} awsConfig
 * @returns {Object} response result
 */
const callEndpoint = (endpoint, params, awsConfig) => {
  return new Promise((resolve, reject) => {
    awsComprehendConfig(awsConfig)[endpoint](params)
      .promise()
      .then((res) => {
        resolve({ data: res, statusCode: 200 });
      })
      .catch((error) => {
        const statusCode = (error.statusCode) ? error.statusCode : 400;
        reject({ error, statusCode });
      });
  });
};

export default callEndpoint;
