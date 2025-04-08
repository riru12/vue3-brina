module.exports = api => {
  return {
    presets: [
      [
        '@babel/preset-env',
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {},
      ],
      '@quasar/babel-preset-app', // Ensure this is after @babel/preset-env
    ],
  };
};
