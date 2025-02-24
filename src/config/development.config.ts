import baseConfig from './base.config';

export default () => ({
  ...baseConfig(),
  port: process.env.PORT,
  database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'default_user',
        password: process.env.DB_PASSWORD || 'default_password',
  },
  logLevel: process.env.LOG_LEVEL || 'debug',
  debug: true,
  featureFlags: {
    newFeature: true,
  },
});