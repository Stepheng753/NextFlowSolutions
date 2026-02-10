module.exports = {
    apps: [
        {
            name: "nextflow-main",
            script: "serve",
            args: "-s main/dist -l 6398",
            env: {
                PM2_SERVE_SPA: "true",
                PM2_SERVE_HOMEPAGE: "/index.html"
            }
        },
        {
            name: "nextflow-torreypineslaw", // Renamed here
            script: "serve",
            args: "-s clients/TorreyPinesLaw/dist -l 6399", // Ensure path matches your screenshot
            env: {
                PM2_SERVE_SPA: "true",
                PM2_SERVE_HOMEPAGE: "/index.html"
            }
        }
    ]
};