import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import  {alias}  from "./alias.ts"

export default defineConfig({
  plugins: [svelte({hot: !process.env.VITEST})],
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles:"./testSetup.ts",
    deps: {
        inline: [
          "@ethersproject/signing-key",
          "@ethersproject/basex"
        ]
      }
  },
  resolve: {
    alias,
  },
})