import { execSync } from 'node:child_process'; import { existsSync, copyFileSync } from 'node:fs';
if (!existsSync('.env')) { copyFileSync('.env.example','.env'); console.log('Created .env from .env.example'); }
for (const command of ['node --version','npm --version']) execSync(command,{stdio:'inherit'});
console.log('Run: docker compose up -d db && npm run db:generate && npm run db:migrate && npm run db:seed');
