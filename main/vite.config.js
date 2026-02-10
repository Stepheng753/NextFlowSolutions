import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: { host: true } // Optional, keeping it simple for now or match TPL if needed
})
