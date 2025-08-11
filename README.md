# TrackMe

A simple Express + Socket.IO + EJS app for real-time location updates.

## Quick start (local)

Requirements: Node.js 18+

```powershell
# install deps
npm install

# run locally
npm start
```

The server listens on port 3000 by default, or the `PORT` environment variable.

---

## Free deployment options

Below are zero-cost or free-tier friendly options. Pick one.

### Option A: Render (free web service)

1. Push this repo to GitHub.
2. In Render, create a new Web Service from your repo.
3. Settings:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free
4. Render sets `PORT` automatically; no code changes needed.

Socket.IO works over long-lived HTTP (WebSocket fallback allowed on free). If you see connection issues, enable "Auto-deploy" and make sure the service isn't sleeping.

### Option B: Fly.io (free allowances vary)

1. Install Fly CLI and sign in.
2. From the project root:
   ```powershell
   fly launch --now --copy-config --no-deploy
   ```
   - Accept Dockerfile detection.
3. Open `fly.toml` and ensure internal `PORT` is 3000; then deploy:
   ```powershell
   fly deploy
   ```

### Option C: Railway (hobby free tier, credit-based)

1. Create a new project from your GitHub repo.
2. Deploy with default settings:
   - Install: `npm install`
   - Start: `npm start`

### Option D: Glitch (simple remix)

1. Create a new Glitch project and import from GitHub.
2. In `package.json`, ensure `start` script is `node index.js` (already set). Glitch sets `PORT`.

---

## Docker (optional)

Build and run locally with Docker:

```powershell
# build image
docker build -t trackme:local .

# run container on port 3000
docker run --rm -p 3000:3000 trackme:local
```

---

## Notes

- The app now respects `PORT` for PaaS.
- If behind a reverse proxy that terminates TLS, no extra Socket.IO config is needed by default.
