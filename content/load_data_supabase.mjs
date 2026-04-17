// Run using .env file
// node --env-file=.env load_data_supabase.mjs

import { execSync } from 'node:child_process';


// if variables missing, throw error
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
}

const BUCKET = 'study-materials';

// set variables for the script
const subjects = [{
    name: 'chemistry',
    freeTopic: 'theme1-matter/topic-01.js',
}, {
    name: 'physics',
    freeTopic: 'theme1-measurement/topic-01.js',
}, {
    name: 'geography',
    freeTopic: 'cluster1-everyday/topic-1-1.js',    
}]

// if --reset flag is provided, reset the db
if (process.argv.includes('--reset')) {
    console.log('Resetting Supabase database...');
    execSync('npx supabase db reset --local');
}

subjects.forEach(subject => {
    console.log(`Loading ${subject.name} content...`);
    execSync(`node tools/sync-study-materials.mjs --subject ${subject.name} --free-topic ${subject.freeTopic}`);
});