# Provider integration

The app intentionally ships with a working simulator only. To add an approved provider, implement `MessagingProvider` in `src/lib/messaging`, store encrypted provider configuration using a managed secret store or KMS, and create a webhook route with the provider's official signature verification. Confirm that the provider supports your intended business account and outbound message policy. Do not use personal-account automation, WhatsApp Web, QR session hijacking, scraping, browser automation, or reverse-engineered APIs.
