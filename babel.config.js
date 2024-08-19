// eslint-disable-next-line func-names -- conmfig file must be like this
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  }
}
