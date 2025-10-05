// Prepared statements only last for the duration of the current database session. When the session ends, the prepared statement is forgotten, so it must be recreated before being used again. This also means that a single prepared statement cannot be used by multiple simultaneous database clients; however, each client can create their own prepared statement to use. Prepared statements can be manually cleaned up using the DEALLOCATE command.
//
// Prepared statements have the largest performance advantage when a single session is being used to execute a large number of similar statements. The performance difference will be particularly significant if the statements are complex to plan or rewrite, for example, if the query involves a join of many tables or requires the application of several rules. If the statement is relatively simple to plan and rewrite but relatively expensive to execute, the performance advantage of prepared statements will be less noticeable.

import { Pool } from 'pg';
import cfg from '#root/config/cfg.js';

const dbPool = new Pool({
  user: cfg.db.USER,
  password: cfg.db.PASS,
  database: cfg.db.NAME,
  host: cfg.db.HOST,
  port: cfg.db.PORT,
  max: cfg.db.MAX_POOL,
  min: cfg.db.MIN_POOL,
  connectionTimeoutMillis: cfg.db.CONNECT_TIMEOUT_MILS,
  idleTimeoutMillis: cfg.db.IDLE_TIMEOUT_MILS,
  maxLifetimeSeconds: cfg.db.MAX_LIFETIME_SECS,
  allowExitOnIdle: cfg.db.ALLOW_EXIT_ON_IDLE,
});

dbPool.on('error', (err) => {
  console.error('Unexpected database client error:', err.stack);
});

export default dbPool;
