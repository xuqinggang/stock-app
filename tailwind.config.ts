/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        red: '#ff4d4d',
        green: '#27c24e',
        desc: '#898B8F',
      },
    },
  },
  plugins: [],
} as Config;
