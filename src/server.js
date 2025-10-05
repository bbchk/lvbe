import app from '#root/app.js';

import env from '#root/config/env.js';

import registerServerShutdownHandlers from '#root/utils/server.shutdownHandlers.js';

const server = app.listen(env.app.PORT, () => {
  // ml.info(`Server is listening on port ${process.env.PORT}`)
});

// TODO: utils.registerServerShutdownHandlers
registerServerShutdownHandlers(server);
