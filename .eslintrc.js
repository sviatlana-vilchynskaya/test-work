module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'import/extensions': [
          'error',
          'always',
          {
            ignorePackages: true,
          },
        ],
      },
    },
  ],
};
