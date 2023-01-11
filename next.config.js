// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')

/**
 * @type {import('next-pwa').PWAConfig}
 */

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = config
