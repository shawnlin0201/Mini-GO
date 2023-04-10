import { defineConfig } from 'windicss/helpers'

const colorSet = ['#6abb6a', '#ffffff', '#589a58', '#ff6633', '#aaaaaa']

export default defineConfig({
  safelist: [
    colorSet.map((color) => `bg-[${color}]`),
    colorSet.map((color) => `text-[${color}]`),
    colorSet.map((color) => `border-[${color}]`),
    colorSet.map((color) => `hover:bg-[${color}]`),
    colorSet.map((color) => `hover:text-[${color}]`),
    colorSet.map((color) => `hover:border-[${color}]`),
  ],
  extract: {
    include: ['src/**/*.{vue,js}'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
})
