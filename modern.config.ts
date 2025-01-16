import { appTools, defineConfig } from '@modern-js/app-tools';
import { koaPlugin } from '@modern-js/plugin-koa';
import { bffPlugin } from '@modern-js/plugin-bff';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
    koaPlugin(), bffPlugin(),
  ],
});
