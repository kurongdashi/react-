module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 配置core-js 转换Promise、Map等对象为es5
        corejs: '3'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-transform-runtime']
};
