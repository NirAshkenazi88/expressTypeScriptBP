export interface Apponfig {
  IS_DEV: boolean;
  REQUEST_TIME_OUT: number;
  VALIDATION_URL: string;
  APP_PORT: number;
  DB_POOL_SIZE: number;
  MYSQL: MYSQL;
  AWS: AWS;
}

export interface MYSQL {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  DATABASE: string;
}

export interface AWS {
  SQS_QUEUE_URL: string;
  REGION: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  ARN: string;
}
