import { dbPool } from '#root/config/db.js';

let shuttingDown = false;

['SIGINT', 'SIGTERM', 'SIGTSTP', 'SIGQUIT'].forEach((signal) => {
  process.on(signal, () => shutServerGracefully(server, 0));
});

process.on('unhandledRejection', (reason) => {
  console.error('⚠️  Unhandled Rejection:', reason);
  shutServerGracefully(server, 1);
});

process.on('uncaughtException', (err) => {
  console.error('⚠️  Uncaught Exception:', err);
  shutServerGracefully(server, 1);
});

async function shutServerGracefully(server, exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  // console.log(`Server is shutting down on port ${process.env.PORT || 3000}`);

  try {
    await dbPool.end();
    // console.log('✅ Database pool closed.');
  } catch (err) {
    // console.error('❌ Error closing database pool:', err);
    exitCode = 1;
  }

  server.close((err) => {
    if (err) {
      // console.error('❌ Error closing HTTP server:', err);
      process.exit(1);
    }

    console.log(`✅ Server closed. Exiting with code ${exitCode}`);
    process.exit(exitCode);
  });
}
