# Repository guidance

- Keep the supported locales (`en`, `fr`, `ar`) in sync; Arabic pages use right-to-left direction.
- Keep contact email and other external services mocked in automated tests; never send real messages from tests.
- Prefer focused, accessible UI changes and preserve the existing responsive behavior.

## Code Review Rules

- Check localized navigation and page direction when changing routing or locale handling.
- Check that user-provided contact fields are validated and safely escaped before being included in email content.
- Flag tests or CI changes that can send real email or depend on production credentials.
