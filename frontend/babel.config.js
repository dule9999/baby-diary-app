module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@screens': './screens',
            '@helpers': './helpers',
            '@constants': './constants',
            '@services': './services',
            '@sharedTypes': '../shared/types',
          }
        }
      ]
    ]
  };
};
