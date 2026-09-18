# Security checklist

- Use a 32+ character random `SESSION_SECRET` and HTTPS in production.
- Add a real login/session middleware before exposing the dashboard publicly; the included processing layer is designed to receive an authenticated user ID.
- Keep provider keys server-side and rotate them.
- Verify webhook signatures and enforce timestamp/replay windows.
- Use rate limiting at the reverse proxy and API layer.
- Use PostgreSQL backups, restricted database roles, and encrypted disks.
- Review audit logs without recording message secrets or provider tokens.
