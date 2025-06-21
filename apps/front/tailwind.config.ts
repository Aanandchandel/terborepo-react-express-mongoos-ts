import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/**/*.{ts,tsx}', // if using shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
