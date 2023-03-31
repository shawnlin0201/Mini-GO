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
    include: ['src/**/*.{vue,js}', '*.html', 'page/web/*.html', 'page/mobile/*.html'],
    exclude: ['node_modules/**/*', '.git/**/*'],
  },
  theme: {
    extend: {
      // todo: prefix mobile extend => global replace
      boxShadow: {
        tooltip: '0 2px 4px 0',
        'header-bar': '0 -4rem 10rem 0',
        'agent-bar': '0 4rem 10rem 0',
        'mobile-input': '0 5rem 8rem 0 #0000001a',
      },
      colors: {
        'title-black': '#333333',
        'p-black': '#555555',
        'btn-gray': '#f1f1f1',
        'btn-green': '#6ab66b',
      },
    },
  },
  plugins: [
    require('windicss/plugin/scroll-snap'),
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 300,
      },
    }),
  ],
  // [shortcuts-] 以'shortcuts' 字母開頭做標示
  shortcuts: {
    'shortcuts-container': 'w-[1200px] m-auto',
    // shortcuts-global-footer
    'shortcuts-global-footer-link-free': 'after:(content-["Free"] inline-block text-[#ff6633] pl-[5px])',
    'shortcuts-global-footer-link-child': 'relative before:(content-["-"] inline-block absolute top-0 left-0)',
    // shortcuts-details
    'shortcuts-details-title': 'text-[18px] leading-[18px] text-[#6ab66b] py-[15px]',
    'shortcuts-details-tag':
      'px-[20px] py-[7px] bg-[#3aaebc] text-white rounded-[30px] leading-none text-[16px] mr-[16px]',
    'shortcuts-details-child-items': 'text-[#333333] w-[360px] text-[18px] leading-loose',
    // shortcuts-deal-price
    'shortcuts-deal-price-content': 'text-center py-[10px]',
  },
})
