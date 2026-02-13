import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-icon.svg'],
            manifest: {
                name: 'Vitalis Health Tracker',
                short_name: 'Vitalis',
                description: 'Track your health metrics and vitality',
                theme_color: '#3b82f6',
                icons: [
                    {
                        src: 'pwa-icon.svg',
                        sizes: '192x192 512x512',
                        type: 'image/svg+xml'
                    }
                ],
                background_color: '#ffffff',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait'
            }
        })
    ],
})
