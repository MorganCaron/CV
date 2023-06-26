import { resolve } from 'path'
import { defineConfig } from 'vite'
import rawPlugin from 'vite-raw-plugin'

export default defineConfig({
	base: "./",
	plugins: [
		rawPlugin({
			fileRegex: /\.html\\?raw$/
		})
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		}
	}
})
