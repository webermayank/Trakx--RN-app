const { getDefaultConfig } = require("expo/metro-config");

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname);

// Force Metro to avoid child process workers on this Windows setup.
config.maxWorkers = 1;
config.transformer.unstable_workerThreads = true;
config.watcher = {
  ...config.watcher,
  unstable_workerThreads: true,
};

module.exports = config;
