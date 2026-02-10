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
            name: "nextflow-torreypineslaw",
            script: "serve",
            env: {
                PM2_SERVE_PATH: './clients/TorreyPinesLaw/dist',
                PM2_SERVE_PORT: 6399,
                PM2_SERVE_SPA: 'true',
                PM2_SERVE_HOMEPAGE: '/index.html'
            }
        }
    ]
};