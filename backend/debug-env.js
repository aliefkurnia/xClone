const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded' : 'NOT LOADED');
console.log('Full URL (masked):', process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'N/A');
