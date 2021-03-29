'use strict';

const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async event => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const id = event.pathParameters.vehicle_id;

    var params = {
        TableName: tableName,
        Key: { id: id }
    };

    const data = await docClient.get(params).promise();
    const item = data.Item;

    const response = {
        statusCode: 200,
        body: JSON.stringify(item)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};