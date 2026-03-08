import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
function basicAuthPlugin() {
    return {
        name: 'vite-plugin-basic-auth',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                let legalAuth = {};
                try {
                    const authPath = path.resolve(__dirname, '../legal-auth.json');
                    if (fs.existsSync(authPath)) {
                        legalAuth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
                    }
                } catch (err) {
                    console.error('Error reading legal-auth.json:', err);
                }

                if (!legalAuth.username || !legalAuth.password) {
                    // No auth configured, just continue
                    return next();
                }

                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    res.setHeader('WWW-Authenticate', 'Basic realm="Legal Page"');
                    res.statusCode = 401;
                    res.end('Unauthorized');
                    return;
                }

                const base64Credentials = authHeader.split(' ')[1];
                const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
                const [username, password] = credentials.split(':');

                if (username === legalAuth.username && password === legalAuth.password) {
                    next();
                } else {
                    res.setHeader('WWW-Authenticate', 'Basic realm="Legal Page"');
                    res.statusCode = 401;
                    res.end('Unauthorized');
                }
            });
        }
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Legal/',
    plugins: [react(), basicAuthPlugin()],
    server: {
        host: true,
        port: 6399
    }
})

