# Crochinesta

## Contact form email configuration

The contact form sends messages through Resend. Configure these server-side environment variables in the deployment environment:

- `RESEND_API_KEY`: Resend API key.
- `CONTACT_FROM_EMAIL`: sender address verified with Resend.
- `CONTACT_TO_EMAIL`: optional destination address (defaults to `crochinesta@gmail.com`).

The API returns a temporary unavailable response until the required Resend settings are configured. Never expose `RESEND_API_KEY` to client-side code.
