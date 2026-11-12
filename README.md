# Crochinesta

## Contact form email configuration

The contact form sends messages through Resend. Configure these server-side environment variables in the deployment environment:

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_FROM_EMAIL`: sender address verified with Resend.
- `CONTACT_TO_EMAIL`: optional destination address (defaults to `crochinesta@gmail.com`).

The API returns a temporary unavailable response until the required Resend settings are configured. Never expose `RESEND_API_KEY` to client-side code.

# Contact form rate limiting

The contact endpoint allows up to five valid submissions per client in a rolling 15-minute window. Production deployments must configure an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The endpoint keys limits by a trusted client IP header: `x-real-ip` by default, or the platform's trusted header via `CONTACT_CLIENT_IP_HEADER`. Configure that header only when the hosting platform overwrites it with the actual client IP; do not use an untrusted client supplied header. If the shared store or valid IP header is unavailable in production, the endpoint returns `503` instead of sending without reliable rate limiting. Local development can use the in-memory fallback, which does not coordinate between processes and resets on restart.
