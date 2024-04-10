module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@JSBASH/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
