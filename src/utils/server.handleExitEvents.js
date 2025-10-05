import dbPool from '#root/config/db.js';
import cfg from '#root/config/cfg.js';

import utils from '#root/utils/index.export.js';

let IS_ALREADY_SHUTTING_DOWN = false;

export default function handleExitEvents() {
  // TODO?: implement custom error?
  if (!this)
    throw new Error(
      'Server instance is required to register shutdown handlers',
    );

  ['SIGINT', 'SIGTERM', 'SIGTSTP', 'SIGQUIT'].forEach((signal) => {
    process.on(signal, () =>
      shutdownGracefully.call(this, cfg.app.EXIT_SUCCESS_CODE),
    );
  });

  process.on('unhandledRejection', (reason) => {
    utils.log.debug('Unhandled Rejection:', reason);

    shutdownGracefully.call(this, cfg.app.EXIT_ERROR_CODE);
  });

  process.on('uncaughtException', (err) => {
    utils.log.debug('Uncaught Exception:', err);
    shutdownGracefully.call(this, cfg.app.EXIT_ERROR_CODE);
  });
}

async function shutdownGracefully(exitCode = cfg.app.EXIT_SUCCESS_CODE) {
  if (IS_ALREADY_SHUTTING_DOWN) return;
  IS_ALREADY_SHUTTING_DOWN = true;

  utils.log.warn(`Server is shutting down on port ${process.env.PORT || 3000}`);

  try {
    await dbPool.end();
    utils.log.debug('Database pool closed.');
  } catch (err) {
    utils.log.debug('Error closing database pool:', err);
    exitCode = cfg.app.EXIT_ERROR_CODE;
  }

  this.close((err) => {
    if (err) {
      utils.log.debug('Error closing HTTP server:', err);
      exitCode = cfg.app.EXIT_ERROR_CODE;
    }

    utils.log.warn(`Server closed. Process exiting with code ${exitCode}`);
    process.exit(exitCode);
  });
}
