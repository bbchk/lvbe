import app from '#root/app.js';

import cfg from '#root/config/cfg.js';

import utils from '#root/utils/index.export.js';

const server = {
  ...app.listen(cfg.app.PORT, () => {
    // ml.info(`Server is listening on port ${process.env.PORT}`)
  }),
  _appCustom: {
    handleExitEvents: utils.server.handleExitEvents
  }
};

server._appCustom.handleExitEvents();
