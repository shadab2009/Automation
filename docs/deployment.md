# Deployment and troubleshooting

Build with `npm ci && npm run build`, then run `npm start` behind an HTTPS reverse proxy. Set `DATABASE_URL`, `APP_URL`, and a strong `SESSION_SECRET` in the hosting secret manager. Run Prisma migrations during a controlled release, not on every web process start.

If Prisma cannot connect, check that Docker is running and `DATABASE_URL` matches the compose service. If the simulator returns `No user configured`, run `npm run db:seed`. For Android LAN testing, allow port 3000 through the local firewall and bind Next to `0.0.0.0`. If the e2e test cannot find the reply, verify PostgreSQL is seeded and the dev server can reach it.
