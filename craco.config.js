const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#685ab3',
              '@layout-header-background': '#fff',
              '@layout-body-background': '#fff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
