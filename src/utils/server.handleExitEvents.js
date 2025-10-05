import dbPool from '#root/config/db.js';
import cfg from '#root/config/cfg.js';

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
    // console.error('⚠️  Unhandled Rejection:', reason);

    shutdownGracefully.call(this, cfg.app.EXIT_ERROR_CODE);
  });

  process.on('uncaughtException', (err) => {
    // console.error('⚠️  Uncaught Exception:', err);
    shutdownGracefully.call(this, cfg.app.EXIT_ERROR_CODE);
  });
}

async function shutdownGracefully(exitCode = cfg.app.EXIT_SUCCESS_CODE) {
  if (IS_ALREADY_SHUTTING_DOWN) return;
  IS_ALREADY_SHUTTING_DOWN = true;

  // console.log(`⚡ Server is shutting down on port ${process.env.PORT || 3000}`);

  try {
    await dbPool.end();
    // console.log('✅ Database pool closed.');
  } catch (err) {
    // console.error('❌ Error closing database pool:', err);
    exitCode = cfg.app.EXIT_ERROR_CODE;
  }

  this.close((err) => {
    if (err) {
      // console.error('❌ Error closing HTTP server:', err);
      exitCode = cfg.app.EXIT_ERROR_CODE;
    }

    // console.log(`✅ Server closed. Exiting with code ${exitCode}`);
    process.exit(exitCode);
  });
}
