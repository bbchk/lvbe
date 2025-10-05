//=== General below ==============================
const APP_ENV = process.env.APP_ENV || 'production';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

//=== Database below ==============================
const DB_PORT = process.env.DB_PORT || '5432';
const DB_HOST = process.env.DB_HOST || 'lvbe-db';
const DB_USER = process.env.DB_USER || 'lvbe';
const DB_PASS = process.env.DB_PASS || 'lvbe';
const DB_NAME = process.env.DB_NAME || 'lv';

export {
  APP_ENV,
  LOG_LEVEL,

  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
};
