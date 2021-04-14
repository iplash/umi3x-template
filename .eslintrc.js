module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: ['eslint-config-ali/typescript/react', 'prettier'],
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'jsx-closing-tag-location': 0,
  },
};
