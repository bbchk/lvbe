import pino from 'pino';

import cfg from '#root/config/cfg.js';

const levels = {
  useOnlyCustomLevels: true,
  customLevels: {
    emerg: 80,
    alert: 70,
    crit: 60,
    error: 50,
    warn: 40,
    notice: 30,
    info: 20,
    debug: 10,
  },
};

const transports = {
  stdout_pino_pretty: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },

  stdout_json: {
    target: 'pino/file',
    options: {
      destination: 1,
    },
  },
};

const format = {
  base: null,
  redact: {
    paths: [
      // 'name',
      // 'address',
      // 'passport',
      // 'phone',
      // 'user.name',
      // 'user.address',
      // 'user.passport',
      // 'user.phone',
      // '*.user.name', // * is a wildcard covering a depth of 1
      // '*.user.address',
      // '*.user.passport',
      // '*.user.phone',
    ],
    censor: '[REDACT]',
  },
  timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,

  // TODO!: ✅ ❌
  // hooks: {
  //   logMethod(args, method) {
  //     if (method === 'warn') {
  //       args[0] = `⚠️ ${args[0]}`;
  //     }
  //     return method.apply(this, args);
  //   },
  // },
};

const logger = pino({
  level: cfg.log.LEVEL,

  transport: cfg.log.IS_PRETTY
    ? transports.stdout_pino_pretty
    : transports.stdout_json,

  ...levels,
  ...format,
});

export default logger;
