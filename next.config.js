/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\.stor(ies|y).[tj]sx$/,
      })
    )
    // Important: return the modified config
    return config
  },
}

module.exports = nextConfig
