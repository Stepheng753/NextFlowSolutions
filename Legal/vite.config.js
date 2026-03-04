import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Legal/',
    plugins: [react()],
    server: {
        host: true,
        port: 6399
    }
})

