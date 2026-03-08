import express from 'express';
import basicAuth from 'express-basic-auth';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 6399;

// Try to load auth from legal-auth.json
let authUsers = {};
try {
  const authPath = path.resolve(__dirname, '../legal-auth.json');
  if (fs.existsSync(authPath)) {
    const legalAuth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
    if (legalAuth.username && legalAuth.password) {
      authUsers[legalAuth.username] = legalAuth.password;
    }
  }
} catch (err) {
  console.error('Error reading legal-auth.json:', err);
}

// Only apply basic auth if credentials exist
if (Object.keys(authUsers).length > 0) {
  app.use(basicAuth({
    users: authUsers,
    challenge: true,
    realm: 'Legal Page'
  }));
}

// Serve static files from dist directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback: redirect all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Legal App Serving on port ${PORT}`);
  if (Object.keys(authUsers).length > 0) {
    console.log('Basic Auth is ENABLED');
  } else {
    console.log('Basic Auth is DISABLED (no valid legal-auth.json found)');
  }
});
