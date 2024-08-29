import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
    outDir: 'whale-fall'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': './src',
      'a':'./src/assets',
      'u':'./src/utils'
    },
  },
	server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://127.0.0.1:3000',
        // target: 'http://47.97.5.199:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, ''),
      // },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // 在使用 `rewriteWsOrigin` 时要特别谨慎，因为这可能会让代理服务器暴露在 CSRF 攻击之下
      // '/socket.io': {
      //   target: 'ws://localhost:5174',
      //   ws: true,
      //   rewriteWsOrigin: true,
      // },
    },
  },
})
