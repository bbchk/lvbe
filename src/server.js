// import { mainLogger as ml } from './utils/loggers.js'
// import { cleanup } from './utils/server_cleanup.js'
import { Client, Pool } from 'pg';

import * as env from '#root/config/env.js';

// TODO: move to constants
const ERROR_EXIT_CODE = 1;

process.on('uncaughtException', (err) => {
  // ml.error(`UncaughtException occured. ${err.message}`)
  process.exit(ERROR_EXIT_CODE);
});

import app from './app.js';
const server = app.listen(3000, () => {
  // const server = app.listen(process.env.PORT, () => {
  // ml.info(`Server is listening on port ${process.env.PORT}`)
});

const cleanupSignals = ['SIGINT', 'SIGTERM', 'SIGTSTP', 'SIGQUIT'];
cleanupSignals.forEach((signal) => {
  process.on(signal, () => {
    // ml.info(`Received ${signal}`)
    cleanup(server);
  });
});

process.on('unhandledRejection', (err) => {
  // ml.error(err.message)
  cleanup(server, ERROR_EXIT_CODE);
});

const pool = new Pool({
  user: env,
  host: 'localhost',
  database: 'lv',
  password: 'lvbe',
  port: 5432,
});
const res = await pool.query('SELECT * FROM lv.categories');

// TODO: replace with POSTGRES;
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     // ml.info('Connected to MongoDB Successfully')
//   })
//   .catch(async (err) => {
//     //? why is it important to explicitly do: await mongoose.connection.close();
//     ml.error(err.message)
//     //todo try to connect again after timeout
//     await cleanup(server, ERROR_EXIT_CODE)
//   })
