/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: process.env.APP_BASE_PATH,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    APP_BASE_PATH: process.env.APP_BASE_PATH,
  }
}
