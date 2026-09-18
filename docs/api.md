# API and integration notes

`POST /api/simulator` accepts `{ senderIdentifier, senderName?, content, providerMessageId?, fail? }`. It validates input, deduplicates provider IDs, persists the conversation, applies assistant settings, and returns the incoming/outgoing records. `GET /api/dashboard` returns aggregate dashboard data.

For a production webhook, authenticate the user/session and add a provider-specific route that verifies the official provider signature before calling `processIncoming`. Never accept arbitrary provider tokens from the browser.
