const e = process.env;

//=== General =====================================

const app = {
  ENV:                    e.APP_ENV || 'production',
  PORT:                   3000,
  EXIT_ERROR_CODE:        1
};

const log = {
  LEVEL:                  e.LOG_LEVEL || 'info',
};

//=== Database =====================================
const db = {
  PORT:                   Number(e.DB_PORT) || 5432,
  HOST:                   e.DB_HOST || 'lvbe-db',
  USER:                   e.DB_USER || 'lvbe',
  PASS:                   e.DB_PASS || 'lvbe',
  NAME:                   e.DB_NAME || 'lv',

  MAX_POOL:               Number(e.DB_MAX_POOL) || 20,
  MIN_POOL:               Number(e.DB_MIN_POOL) || 0,
  CONNECT_TIMEOUT_MILS:   Number(e.DB_CONNECT_TIMEOUT_MILS) || 5_000,
  IDLE_TIMEOUT_MILS:      Number(e.DB_IDLE_TIMEOUT_MILS) || 30_000,
  MAX_LIFETIME_SECS:      Number(e.DB_MAX_LIFETIME_SECS) || 0,

  ALLOW_EXIT_ON_IDLE:     e.APP_ENV !== 'production',
};

export default { app, log, db };
