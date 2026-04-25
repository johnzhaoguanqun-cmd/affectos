# AffectOS

AffectOS is a speculative interface that shows how social feeds can capture behavior, infer emotion, and adapt content to reinforce engagement.

## Current Build

- Frontend-only static app (`index.html`, `styles.css`, `app.js`)
- No video elements
- No API mode
- AI Interpretation Layer uses local simulated analysis only
- Mixed media cards (images, GIFs, animated gradients)
- Responsive feed + right-side behavioral dashboard

## Run locally

```bash
npx serve .
```

Then open the local URL printed in terminal.

## Use real internet images/GIFs as local files (recommended)

To avoid unstable online loading, download media once to local assets:

```powershell
cd c:\Users\20947\Desktop\5010\AffectOS
powershell -ExecutionPolicy Bypass -File .\tools\download-real-media.ps1
```

This fills `assets/real-media/` and the app will use those files directly.

## Deploy

Deploy this folder directly to any static host:
- Vercel
- Netlify
- GitHub Pages

No backend setup is required for this version.
