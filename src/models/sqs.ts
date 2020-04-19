import AWS from 'aws-sdk';
import config from '../config';
import { Consumer } from 'sqs-consumer';

AWS.config.update({
  region: config.AWS.REGION,
  accessKeyId: config.AWS.ACCESS_KEY_ID,
  secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
});
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  MaxNumberOfMessages: 1,
  QueueUrl: config.AWS.SQS_QUEUE_URL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 10,
};

const reciveMessage = (sqsUrl: string) => {
  return new Promise((resolve, reject) => {
    try {
      sqs.receiveMessage(
        { ...params, QueueUrl: config.AWS.SQS_QUEUE_URL + sqsUrl },
        function (err, data) {
          if (err) reject('Error: ' + err);
          if (data.Messages) resolve(data);
        }
      );
    } catch (e) {
      return reject(e);
    }
  });
};

const consume = (func: (message: AWS.SQS.Message) => void) => {
  try {
    const app = Consumer.create({
      queueUrl: config.AWS.SQS_QUEUE_URL,
      batchSize: 10,
      handleMessage: async (message) => {
        func(message);
      },
    });

    app.on('error', (err) => {
      console.log(err.message);
    });

    app.start();
  } catch (e) {
    throw new Error(e);
  }
};

const deleteSQSMessage = (receiptHandle: string) => {
  return new Promise((resolve, reject) => {
    try {
      const deleteParams = {
        QueueUrl: config.AWS.SQS_QUEUE_URL,
        ReceiptHandle: receiptHandle,
      };

      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) reject('Delete Error ' + err);
        resolve('Message Deleted ' + data);
      });
    } catch (e) {
      return reject(e);
    }
  });
};

const sendMessage = (msg: { [key: string]: any }, sqsUrl: string) => {
  return new Promise((resolve, reject) => {
    const params = {
      MessageBody: JSON.stringify({
        date: new Date().toISOString(),
        body: msg,
      }),
      QueueUrl: config.AWS.SQS_QUEUE_URL + sqsUrl,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) reject(err);
      resolve(data.MessageId);
    });
  });
};

export { reciveMessage, deleteSQSMessage, consume, sendMessage };
