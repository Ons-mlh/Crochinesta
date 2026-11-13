# Crochinesta

## Contact form email configuration

The contact form sends messages through Resend. Configure these server-side environment variables in the deployment environment:

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_FROM_EMAIL`: sender address verified with Resend.
- `CONTACT_TO_EMAIL`: optional destination address (defaults to `crochinesta@gmail.com`).

The API returns a temporary unavailable response until the required Resend settings are configured. Never expose `RESEND_API_KEY` to client-side code.

# Contact form rate limiting

The contact endpoint allows up to five valid submissions per client in a rolling 15-minute window. Production deployments must configure an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The endpoint keys limits by a trusted client IP header: `x-real-ip` by default, or the platform's trusted header via `CONTACT_CLIENT_IP_HEADER`. Configure that header only when the hosting platform overwrites it with the actual client IP; do not use an untrusted client supplied header. If the shared store or valid IP header is unavailable in production, the endpoint returns `503` instead of sending without reliable rate limiting. Local development can use the in-memory fallback, which does not coordinate between processes and resets on restart.

## Automated tests

- `npm run test:unit` runs contact API tests with the Resend provider mocked.
- `npm run test:e2e` runs a single Playwright contact form success flow; it intercepts the API request, so no email or production credentials are used. Install the browser once with `npx playwright install chromium`.
- `npm run lint`, `npm run typecheck`, and `npm run build` run the source syntax check, TypeScript checks, and production build. Pull requests and pushes to `main` run these checks and the unit tests in GitHub Actions; Playwright reports and failure traces are uploaded as workflow artifacts.
- Locale redirect and text-direction tests are staged for when localized routes land on the base branch. Add component or broader browser coverage only when it covers behavior beyond this contact journey.
