module.exports = {
  webpack: {
    configure: (webpackConfig, { _env, _paths }) => {
      const customWebpackConfig = {
        ...webpackConfig,
        module: {
          ...webpackConfig.module,
          rules: [
            ...webpackConfig.module.rules,
            {
              test: /\.s[ac]ss$/i,
              use: [
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      'src/app/styles/_functions.scss',
                      'src/app/styles/_mixins.scss',
                      'src/app/styles/_variables.scss',
                    ],
                  },
                },
              ],
            },
          ],
        },
      };
      return customWebpackConfig;
    },
  },
};
