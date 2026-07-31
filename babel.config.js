module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // reanimated's plugin MUST be listed last — this is a hard requirement
    // from the library itself, not a style preference.
    plugins: ['react-native-reanimated/plugin'],
  };
};