# Nova

Nova is a family-friendly AI companion for **all ages**. Chat, make short interactive stories, or play simple quizzes and riddles — with a safety-first voice that stays appropriate for a shared family device.

A parent or guardian should stay nearby when children use it. Nova can get facts wrong.

## What you can do

- **Chat** — talk with Nova about everyday questions, ideas, and curiosity.
- **Stories** — pick a theme (dragons, space, animals, mystery, folklore, everyday adventure) or type your own. Nova writes a short scene, then asks what happens next.
- **Learn** — short quizzes and riddles on animals, numbers, space, kindness, science, and wordplay. Right answers get a cheer; wrong ones never get shame.

Use **Kid / Teen / Adult** in the header to change how complex the language is. The default is **Teen** (a safe middle ground). This is not an age gate — anyone can switch it. Family-safe rules stay on in every voice: no adult/sexual content, no graphic violence, no self-harm advice, no fishing for personal data, no meeting strangers.

## Run it on your computer

You need [Node.js 20+](https://nodejs.org/) and an API key from [OpenAI](https://platform.openai.com/) (or another host that speaks the OpenAI API).

1. Copy the example env file and add your key:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:

   ```
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_MODEL=gpt-4o-mini
   PORT=43123
   ```

   Optional: set `OPENAI_BASE_URL` if you are pointing at another OpenAI-compatible provider (for example a proxy or a local server). Leave it blank for OpenAI itself.

2. Install and start in development:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Without an API key, the app still loads. Nova will send a short demo reply instead of a live model response, so you can click around safely.

### Production-style start

```bash
npm install
npm run build
npm start
```

`npm start` respects `PORT` (defaults to 43123).

## Deploy on Railway

1. Push this project to a GitHub (or other Git) repo, or deploy from the Railway dashboard by connecting the repo.
2. In [Railway](https://railway.app), **New Project** → **Deploy from GitHub repo** (or the CLI).
3. Railway should pick up the `Dockerfile`. If you are asked for a start command, you do not need one — the image already runs `node server.js`.
4. Open the service → **Variables** and add:

   | Name | Example | Required |
   | --- | --- | --- |
   | `OPENAI_API_KEY` | `sk-...` | Yes, for live chat |
   | `OPENAI_MODEL` | `gpt-4o-mini` | No (this is the default) |
   | `OPENAI_BASE_URL` | `https://api.openai.com/v1` | No |
   | `PORT` | Railway sets this for you | No |

5. Generate a public URL (Railway: **Settings** → **Networking** → **Generate Domain**).
6. Open the URL. If chat still shows the demo banner, the API key variable is missing or the service needs a redeploy after you saved it.

Railway injects `PORT`. The container listens on `0.0.0.0` so the proxy can reach it.

### Docker on your machine (optional)

```bash
docker build -t nova .
docker run --rm -p 43123:43123 \
  -e PORT=43123 \
  -e OPENAI_API_KEY=sk-your-key-here \
  -e OPENAI_MODEL=gpt-4o-mini \
  nova
```

Then visit [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Safety notes

- There is no login in this first version. Treat a public URL like a shared demo: anyone with the link can talk to your key's model, so keep the Railway app private or add your own access control later if you need it.
- Nova is instructed not to ask for real names, addresses, schools, or phone numbers. Still remind kids not to share those.
- Model safety is not perfect. Supervision matters more than the prompt.

## Project layout

- `src/app/page.tsx` — the companion UI
- `src/app/api/chat/route.ts` — streaming chat (OpenAI-compatible)
- `src/lib/prompts.ts` — persona, modes, and safety rules
- `Dockerfile` — production image for Railway
