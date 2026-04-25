# AffectOS

AffectOS is a speculative social media interface that demonstrates how platforms can turn behavior and emotion signals into adaptive feed decisions.

It intentionally shows two layers:
- User-facing feed
- System-facing manipulation dashboard

## What This Version Includes

- Responsive UI for desktop, tablet, and phone
- Real video posts (`<video>`) plus image posts
- Like / comment / share interactions with live counters
- Keyword-based comment signal detection
- Feed reordering/adaptation rules
- Mechanism flow animation:
  - User Action -> Data Capture -> AI Interpretation -> System Decision -> Feed Adjustment -> Behavior Reinforcement
- OpenAI API analysis layer through a secure backend endpoint (`/api/analysis`)
- Fallback messaging if backend or key is missing

## Project Structure

```txt
AffectOS/
  index.html
  styles.css
  app.js
  api/
    analysis.js
  README.md
```

## Run Locally

This project should be served over HTTP (not just `file://`) for best media/network behavior.

1. Open a terminal in `AffectOS`
2. Run:
   - `npx serve .`
3. Open the local URL shown in terminal

## Why OpenAI Was Not Linked Before

A browser page cannot safely store your OpenAI API key.

If you call OpenAI directly from frontend code:
- your key is exposed to anyone
- requests can fail due to security/CORS setup

Correct pattern:
- Frontend -> your backend endpoint (`/api/analysis`) -> OpenAI Responses API

This repo now includes `api/analysis.js` as that server-side bridge.

## Configure OpenAI Securely

Set a server environment variable:
- `OPENAI_API_KEY=your_key_here`

Never put API keys in:
- `app.js`
- `index.html`
- any client-side source

## Deploy So Every Device Can Access It

### Fastest: Vercel

1. Push `AffectOS` to GitHub.
2. In Vercel, import the repo/folder.
3. Framework preset: `Other`.
4. Build command: leave empty.
5. Output directory: `.`.
6. In project settings -> Environment Variables, add:
   - `OPENAI_API_KEY`
7. Deploy.

You will get a public HTTPS URL that works on laptop/tablet/phone.

### Netlify

Static hosting works, but for API endpoint you need Netlify Functions adaptation.
If you want OpenAI analysis on Netlify, add a Netlify function equivalent of `api/analysis.js`.

### GitHub Pages

Great for static frontend only, but no secure server function by default.
Use it only if you disable API calls or provide backend elsewhere.

## OpenAI Endpoint Contract

Frontend (`app.js`) sends:

```json
{
  "userActionData": {
    "type": "like|comment|share|scroll",
    "postCategory": "productivity|anxiety|...",
    "reactionType": "like|comment|share|scroll",
    "commentSignal": "stress|productivity|stable|neutral"
  }
}
```

Backend returns:

```json
{
  "analysis": "Short interpretation text..."
}
```

## Notes

- Public media URLs can occasionally fail by region/network; fallback cards are shown automatically.
- If API endpoint fails, UI shows a diagnostic message in the AI panel.
