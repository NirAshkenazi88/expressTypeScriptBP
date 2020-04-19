import AWS from 'aws-sdk';
import config from '../config';

AWS.config.update({ region: config.AWS.REGION });

const publishMessage = (message: string) => {
  try {
    const params = {
      Message: message,
      TopicArn: config.AWS.ARN,
    };

    return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
  } catch (err) {
    console.log('sns err');
    console.log(err.message);
  }
};

export default publishMessage;
