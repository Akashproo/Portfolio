# Akash Rathod Portfolio

React portfolio built with Vite. The site uses the portrait, resume, and project illustrations supplied with the original portfolio.

## Run locally

1. Install [Node.js](https://nodejs.org/) (npm is included).
2. From this directory, run:

   ```sh
   npm install
   npm run dev
   ```

3. Open the local URL printed by Vite (by default, `http://localhost:5173`).

Create a production build with `npm run build`. To serve that build locally, run `npm run preview`.

The featured cards refresh their matching public GitHub repository links and latest push dates when a visitor opens the site. Repository updates appear on the next page load; the portfolio text and illustrations stay curated here.

The contact form posts to a Netlify Function that sends mail through Resend. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in the Netlify environment. Keep real credentials private and out of Git. Without these settings the form reports that delivery is unavailable, and does not claim the message was sent.

Local development includes a Vite middleware for the same contact function, so `npm run dev` serves both the site and form endpoint. Deployments use `netlify/functions/contact.mjs`. The resume download uses `public/assets/AkashRathodResume.pdf`.
