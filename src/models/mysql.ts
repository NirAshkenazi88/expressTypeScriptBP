import mysql from 'mysql';
import config from '../config';

var pool = mysql.createPool({
  connectionLimit: config.DB_POOL_SIZE,
  host: config.MYSQL.HOST,
  port: config.MYSQL.PORT,
  user: config.MYSQL.USER,
  password: config.MYSQL.PASSWORD,
  database: config.MYSQL.DATABASE,
});

export const DBQuery = (
  sql: string
): Promise<{ status: string; result: mysql.MysqlError | any }> => {
  return new Promise((resolve, reject) => {
    pool.query(sql, function (err, result, fields) {
      if (err) return reject({ status: 'error', result: err });
      return resolve({ status: 'success', result });
    });
  });
};

export const closeConnection = (): void => {
  pool.end();
};
