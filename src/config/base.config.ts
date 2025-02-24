export default () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT,
    database: {
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME || 'petcare',
    },
    appName: process.env.APP_NAME || 'Pet Care App',
    });
  