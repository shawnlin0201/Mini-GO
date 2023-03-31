import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'
const removeDataTestAttrs = (node) => {
  const NodeTypes = Object.freeze({
    ELEMENT: 1,
    ATTRIBUTE: 6,
  })
  if (node.type === NodeTypes['ELEMENT']) {
    node.props = node.props.filter((prop) => (prop.type === NodeTypes['ATTRIBUTE'] ? prop.name !== 'data-test' : true))
  }
}

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: process.env.VITE_JS_PATH,
    test: {
      globals: true,
    },
    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            nodeTransforms: isProd ? [removeDataTestAttrs] : [],
          },
        },
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
      }),
      WindiCSS({
        fileExtensions: ['vue', 'js', 'html'],
      }),
      Components({
        resolvers: IconsResolver({
          compiler: 'vue3',
          prefix: 'Icon',
        }),
      }),
      // Icon List: https://icones.netlify.app/collection/all
      Icons(),
    ],
    build: {
      rollupOptions: {
        input: {
          www: path.resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: `js/[name].js`,
          chunkFileNames: `js/[name]_${+new Date()}.js`,
          assetFileNames: function (chunkInfo) {
            const fileExtName = chunkInfo.name.split('.')[chunkInfo.name.split('.').length - 1]
            let output = ''

            switch (fileExtName) {
              case 'css':
                output = `css/[name].css`
                break
              case 'svg':
              case 'png':
              case 'jpg':
              case 'jpeg':
                output = `images/[name].${fileExtName}`
                break
              default:
                output = `[name].[ext]`
                break
            }

            return output
          },
        },
      },
    },
  })
}
