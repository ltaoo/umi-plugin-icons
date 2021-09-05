import { resolve } from 'path';

import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  icons: {
    entry: resolve(__dirname, './assets/icons'),
  },
});
