/// <reference types="vitest/config" />
import babel from '@rolldown/plugin-babel'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
// import svgr from 'vite-plugin-svgr'

import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

const dirname =
  typeof __dirname === 'undefined' ? path.dirname(fileURLToPath(import.meta.url)) : __dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert({
      savePath: './.tls',
    }),
    babel({
      presets: [reactCompilerPreset()],
    }),
    createSvgSpritePlugin({
      exportType: 'react',
      include: '**/assets/icons/**/*.svg',
      svgo: {
        multipass: true,
        floatPrecision: 2,
        js2svg: {
          indent: 2,
          pretty: false,
        },
        plugins: [
          'removeDoctype',
          'removeXMLProcInst',
          'removeComments',
          'removeMetadata',
          'removeEditorsNSData',
          // 'cleanupAttrs',
          // 'mergeStyles',
          // 'inlineStyles',
          'minifyStyles',
          // 'cleanupIds',
          'removeUselessDefs',
          // 'cleanupNumericValues',
          // 'convertColors',
          'removeUnknownsAndDefaults',
          'removeNonInheritableGroupAttrs',
          'removeUselessStrokeAndFill',
          // 'cleanupEnableBackground',
          'removeHiddenElems',
          'removeEmptyText',
          'convertShapeToPath',
          'convertEllipseToCircle',
          // 'moveElemsAttrsToGroup',
          // 'moveGroupAttrsToElems',
          // 'collapseGroups',
          'convertTransform',
          'removeEmptyAttrs',
          'removeEmptyContainers',
          'removeUnusedNS',
          'mergePaths',
          'sortAttrs',
          'sortDefsChildren',
          'removeDesc',
        ],
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 3000,
      // Важно для macOS
      protocol: 'wss',
      host: 'localhost',
    },
    watch: {
      usePolling: false, // Для macOS обычно false
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
