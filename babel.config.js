module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // NOTE: `expo-router/babel` is a temporary plugin which provides backwards compatibility
            // for a small number of things that have been removed from Babel 7.
            'expo-router/babel',
        ],
    };
};