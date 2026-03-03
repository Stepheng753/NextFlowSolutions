// --- Configuration ---
export const CONFIG = {
    colors: {
        primary: '#1e293b', // Slate 800
        accent: '#d97706',  // Legal Gold
        bg: '#f8fafc',      // Slate 50
        border: '#e2e8f0'   // Slate 200
    },
    endpoints: {
        conversion: 'https://n8n.stepheng753.com/webhook/figure-conversion',
        feedback: 'https://n8n.stepheng753.com/webhook/figure-feedback',
        patent: 'https://n8n.stepheng753.com/webhook/patentability-analysis',
        medical: 'https://n8n.stepheng753.com/webhook/medical-contradiction',
        reconciliateBills: 'https://n8n.stepheng753.com/webhook/reconciliate-bills'
    },
    assets: {
        logo: 'https://torreypineslaw.com/art/Torrey-Pines-Law-Group-300-registered.png'
    },
    defaultClient: {
        id: 'default',
        name: 'Placeholder Law Group',
        logo: 'generic.avif',
        description: 'Intellectual Property & AI Automation'
    },
    clients: [
        {
            id: 'torreypines',
            keywords: ['torreypineslaw', 'torreypineslawgroup', 'torreypinesconsulting', 'tpl', 'tpc'],
            name: 'Torrey Pines Law Group',
            logo: 'torreypineslaw.png',
            headerLogo: 'https://torreypineslaw.com/art/Torrey-Pines-Law-Group-300-registered.png',
            description: 'Intellectual Property & AI Automation'
        }
    ]
};
