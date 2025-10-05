import { dbPool } from '#root/config/db.js';

let shuttingDown = false;

export function registerServerShutdownHandlers(server) {
  if (!server) throw new Error('Server instance is required to register shutdown handlers');

  async function shutServerGracefully(exitCode = 0) {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`⚡ Server is shutting down on port ${process.env.PORT || 3000}`);

    try {
      await dbPool.end();
      console.log('✅ Database pool closed.');
    } catch (err) {
      console.error('❌ Error closing database pool:', err);
      exitCode = 1;
    }

    server.close((err) => {
      if (err) {
        console.error('❌ Error closing HTTP server:', err);
        process.exit(1);
      }

      console.log(`✅ Server closed. Exiting with code ${exitCode}`);
      process.exit(exitCode);
    });
  }

  ['SIGINT', 'SIGTERM', 'SIGTSTP', 'SIGQUIT'].forEach((signal) => {
    process.on(signal, () => shutServerGracefully(0));
  });

  process.on('unhandledRejection', (reason) => {
    console.error('⚠️  Unhandled Rejection:', reason);
    shutServerGracefully(1);
  });

  process.on('uncaughtException', (err) => {
    console.error('⚠️  Uncaught Exception:', err);
    shutServerGracefully(1);
  });
}

