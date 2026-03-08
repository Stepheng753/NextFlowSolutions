const fs = require('fs');
const path = require('path');

let legalAuth = {};
try {
    const authPath = path.join(__dirname, 'legal-auth.json');
    if (fs.existsSync(authPath)) {
        legalAuth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
    }
} catch (err) {
    console.error('Error reading legal-auth.json:', err);
}

module.exports = {
    apps: [
        {
            name: "nextflow-main",
            script: "serve",
            env: {
                PM2_SERVE_PATH: './main/dist',
                PM2_SERVE_PORT: 6398,
                PM2_SERVE_SPA: 'true',
                PM2_SERVE_HOMEPAGE: '/index.html'
            }
        },
        {
            name: "nextflow-legal",
            script: "Legal/server.js",
            env: {
                PORT: 6399
            }
        }
    ]
};