const presetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    presetEnv({ stage: 0 }),
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
};
