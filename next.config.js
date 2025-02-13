module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['public'] = false;
    }
    return config;
  },
};