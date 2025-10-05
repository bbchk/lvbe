// Prepared statements only last for the duration of the current database session. When the session ends, the prepared statement is forgotten, so it must be recreated before being used again. This also means that a single prepared statement cannot be used by multiple simultaneous database clients; however, each client can create their own prepared statement to use. Prepared statements can be manually cleaned up using the DEALLOCATE command.
//
// Prepared statements have the largest performance advantage when a single session is being used to execute a large number of similar statements. The performance difference will be particularly significant if the statements are complex to plan or rewrite, for example, if the query involves a join of many tables or requires the application of several rules. If the statement is relatively simple to plan and rewrite but relatively expensive to execute, the performance advantage of prepared statements will be less noticeable.

import { Pool } from 'pg';
import env from '#root/config/env.js';

const dbPool = new Pool({
  user: env.db.USER,
  password: env.db.PASS,
  database: env.db.NAME,
  host: env.db.HOST,
  port: env.db.PORT,
  max: env.db.MAX_POOL,
  min: env.db.MIN_POOL,
  connectionTimeoutMillis: env.db.CONNECT_TIMEOUT_MILS,
  idleTimeoutMillis: env.db.IDLE_TIMEOUT_MILS,
  maxLifetimeSeconds: env.db.MAX_LIFETIME_SECS,
  allowExitOnIdle: env.db.ALLOW_EXIT_ON_IDLE,
});

dbPool.on('error', (err) => {
  console.error('Unexpected database client error:', err.stack);
});

export default dbPool;
