import app from '#root/app.js';

import env from '#root/config/env.js';
import dbPool from '#root/config/db.js';

const server = app.listen(env.app.PORT, () => {
  // ml.info(`Server is listening on port ${process.env.PORT}`)
});

const gracefulShutdownSignals = ['SIGINT', 'SIGTERM', 'SIGTSTP', 'SIGQUIT', 'unhandledRejection', 'uncaughtException'];
gracefulShutdownSignals.forEach((signal) => {
  process.on(signal, (error) => {
    // ml.info(`Received ${signal}`)

    // TODO: pass exit code depending on circumctances
    shutServerGracefully(server);
  });
});

async function shutServerGracefully(server, exitCode = 0) {
  // ml.info(`Server is closing on port ${process.env.PORT}`)
  await dbPool.end()

  server.close(function (err) {
    if (err) {
      // ml.error(err.message)
      process.exit(app.EXIT_ERROR_CODE)
    }
    process.exit(exitCode)
  })
}
