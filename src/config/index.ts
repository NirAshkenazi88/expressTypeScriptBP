import { Apponfig, MYSQL, AWS } from '../interfaces/AppConfig';
const env = process.env.NODE_ENV || 'dev';

const appSecert = '';

const DEV_MYSQL: MYSQL = {
  HOST: '',
  PORT: 33066,
  USER: '',
  PASSWORD: '',
  DATABASE: '',
};

const PROD_MYSQL: MYSQL = {
  HOST: '',
  PORT: 3306,
  USER: '',
  PASSWORD: '',
  DATABASE: '',
};

const AWS: AWS = {
  SQS_QUEUE_URL: '',
  REGION: '',
  ACCESS_KEY_ID: '',
  SECRET_ACCESS_KEY: '',
  ARN: '',
};

const dev = {
  IS_DEV: true,
  REQUEST_TIME_OUT: 10 * 60000,
  VALIDATION_URL: '',
  APP_PORT: 3000,
  DB_POOL_SIZE: 1,
  MYSQL: DEV_MYSQL,
  AWS,
};

const production = {
  IS_DEV: false,
  REQUEST_TIME_OUT: 10 * 60000,
  VALIDATION_URL: '',
  APP_PORT: 3000,
  DB_POOL_SIZE: 3,
  MYSQL: PROD_MYSQL,
  AWS,
};

const config: { [name: string]: Apponfig } = { dev, production };
export default { ...config[env], appSecert };
