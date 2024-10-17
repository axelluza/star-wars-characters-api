process.env.TABLE_NAME = 'StarWarsCharactersTable';
process.env.AWS_REGION = 'us-east-1';

const AWS = require('aws-sdk-mock');
const AWS_SDK = require('aws-sdk');

AWS_SDK.config.update({ region: 'us-east-1' });

AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
  callback(null, {});
});
AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
  callback(null, { Items: [] });
});
AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
  callback(null, { Item: {} });
});
AWS.mock('DynamoDB.DocumentClient', 'update', (params, callback) => {
  callback(null, { Attributes: {} });
});
AWS.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
  callback(null, {});
});
