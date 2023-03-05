/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/author/:author*',
        destination: '/', // we need to redirect from a results page
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
