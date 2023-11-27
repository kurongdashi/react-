module.exports = {
  "extends": [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    'plugin:prettier/recommended',
    "prettier"
  ],
  "plugins": [
    "react",
    "react-hooks",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jsx": true,
    "react": true,
    "react-dom": true,
  },
  "rules": {
    "prettier/prettier": "error", // 使用Prettier来格式化代码，设置为error级别以确保代码格式化  
    "react/display-name": "off", // 禁用React的display-name规则（如果需要可以随时开启）  
    "react/prop-types": "off", // 禁用React的prop-types规则（如果需要可以随时开启）  
    "react/state-in-constructor": "off", // 禁用React的state-in-constructor规则（如果需要可以随时开启）  
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }], // 指定React文件扩展名（对于TypeScript文件）  
    "react-hooks/rules-of-hooks": "error", // 确保遵循React Hooks的规则（例如，只在effect使用useState）  
    "react-hooks/exhaustive-deps": "warn", // 对依赖项的检查，如果有不完整的依赖项，会发出警告（例如，当useEffect更改某些状态时）  
  }
}