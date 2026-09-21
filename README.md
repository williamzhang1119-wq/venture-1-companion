# Venture 1

Venture 1 is an **all-ages multilingual tutor**: a family-safe personal teacher for science, nature, history, arts, sports, school subjects, languages, how things work, and more. Use Chat, short interactive stories, and simple quizzes. It replies in the language you write in.

A parent or guardian should stay nearby when children use it. Venture 1 can get facts wrong.

## What you can do

- **Chat** — learn or talk with a tutor. Everyday curiosity can get a clear answer; for homework, quizzes, math, or “what’s the answer,” Venture 1 hints first and lets you try before explaining.
- **Stories** — pick a theme (dragons, space, animals, mystery, folklore, everyday adventure) or type your own. Venture 1 writes a short scene in your language, then asks what happens next.
- **Learn** — short quizzes and riddles. Hints first; the full answer comes after you attempt (or you ask to see it). Wrong guesses never get shame.

Math, formulas, and scientific notation render with LaTeX (KaTeX) in chat.

**Any language.** Use the **Language** control in the header to change the interface (English, Spanish, French, Simplified Chinese, Arabic, Hindi, Portuguese, or Auto to match the browser). Type in any language — Venture 1 answers in that language, and follows what you write if it differs from the UI language. You can also ask it to teach one language using another (for example, Spanish explained in English).

Use **Kid / Teen / Adult** in the header to change how complex the wording is. The default is **Teen** (a safe middle ground). This is not an age gate — anyone can switch it. Tutoring style stays on in every voice. Family-safe rules stay on too: no adult/sexual content, no graphic violence, no self-harm advice, no fishing for personal data, no meeting strangers.

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

Without an API key, the app still loads. Venture 1 will send a short demo reply instead of a live model response, so you can click around safely.

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
docker build -t venture-1 .
docker run --rm -p 43123:43123 \
  -e PORT=43123 \
  -e OPENAI_API_KEY=sk-your-key-here \
  -e OPENAI_MODEL=gpt-4o-mini \
  venture-1
```

Then visit [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Safety notes

- There is no login in this first version. Treat a public URL like a shared demo: anyone with the link can talk to your key's model, so keep the Railway app private or add your own access control later if you need it.
- Venture 1 is instructed not to ask for real names, addresses, schools, or phone numbers. Still remind kids not to share those.
- Model safety is not perfect. Supervision matters more than the prompt.

## Project layout

- `src/app/page.tsx` — the companion UI
- `src/app/api/chat/route.ts` — streaming chat (OpenAI-compatible)
- `src/lib/prompts.ts` — persona, modes, and safety rules
- `Dockerfile` — production image for Railway
