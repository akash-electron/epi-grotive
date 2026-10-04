# Epigrotive site

Next.js landing page (desktop 1920 and phone 390, matched to the Figma design). All text and images come from a MongoDB content document edited by the separate admin app (`epigrotive-admin-panel`).

## Setup
1. `pnpm install`
2. Copy `.env.example` to `.env.local` and set `MONGODB_URI`, `MONGODB_DB` and `REVALIDATE_SECRET`.
3. `pnpm db:check` (test the connection), `pnpm db:seed` (write the default content once)
4. `pnpm dev` (http://localhost:3000)

## Notes
- Content is cached until the admin calls `POST /api/revalidate` with header `x-revalidate-secret`.
- Contact form messages are stored in the `submissions` collection.
- Without `MONGODB_URI` the site shows the built-in default content.
