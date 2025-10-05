import app from '#root/app.js';
import { app } from '#root/config/env.js';

const server = app.listen(app.PORT, () => {
  // ml.info(`Server is listening on port ${process.env.PORT}`)
});

const cleanupSignals = ['SIGINT', 'SIGTERM', 'SIGTSTP', 'SIGQUIT', 'unhandledRejection', 'uncaughtException'];
cleanupSignals.forEach((signal) => {
  process.on(signal, (error) => {
    // ml.info(`Received ${signal}`)

    // TODO: pass exit code depending on circumctances
    shutServerGracefully(server);
  });
});

async function shutServerGracefully(server, exitCode = 0) {
  // ml.info(`Server is closing on port ${process.env.PORT}`)
  // await pool.end()

  server.close(function (err) {
    if (err) {
      // ml.error(err.message)
      process.exit(app.EXIT_ERROR_CODE)
    }
    process.exit(exitCode)
  })
}
