import Syncano from '@syncano/core';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = new Syncano(ctx);

  try {
    const result = await callEndpoint('batchDetectSentiment', ctx.args, ctx.config);
    const { statusCode, data } = result;
    response.json(data, statusCode);
  } catch (err) {
    const { statusCode, error } = err;
    response.json(error, statusCode);
  }
};
