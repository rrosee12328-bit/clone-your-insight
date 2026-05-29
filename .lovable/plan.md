## Goal

Replace the placeholder Featured Videos section with real, auto-updating videos pulled from Ricky's two YouTube channels, split by lane:

- **Faith & Wisdom** → `@biblestudywithrickyrose`
- **AI & Business** → `@learningwithrickylrose`

## Setup steps (you do these)

1. **Connect Supabase** — click the green "Supabase" button in the top-right of Lovable. Choose your existing project (or create one). Lovable auto-stores `SUPABASE_URL`, anon key, and service role key.
2. **Get a YouTube Data API v3 key** (free):
   - Go to https://console.cloud.google.com/ → create/select a project
   - APIs & Services → Library → enable "YouTube Data API v3"
   - APIs & Services → Credentials → Create Credentials → API key
   - Copy the key — you'll paste it into a Lovable secret prompt I'll trigger
3. Approve the secret prompt I send for `YOUTUBE_API_KEY`.

## What I'll build

### 1. Edge Function: `get-youtube-videos`
- Resolves the two channel handles → channel IDs (one-time, cached)
- Pulls latest ~6 videos per channel via YouTube `search.list` (ordered by date)
- Returns `{ faith: [...], business: [...] }` with `videoId, title, thumbnail, publishedAt, channelTitle`
- CORS enabled, public (no JWT required — read-only public data)

### 2. Caching table: `youtube_videos_cache`
```text
id (uuid pk) | lane (text) | payload (jsonb) | fetched_at (timestamptz)
```
- RLS: public SELECT, service-role-only INSERT/UPDATE
- Edge function checks cache freshness (1 hour TTL) before hitting YouTube API
- Keeps us safely under YouTube's 10,000-unit daily quota

### 3. Frontend changes
- `src/components/landing/LatestContent.tsx` (or a new `FeaturedVideos.tsx`): fetch from edge function on mount, render two rows:
  - "Latest from Bible Study with Ricky Rose" (3 videos)
  - "Latest from Learning with Ricky Rose" (3 videos)
- Each card: thumbnail, title, publish date, click → opens video on YouTube in new tab
- Loading skeletons + graceful fallback to placeholder if fetch fails
- Reuses existing dark theme tokens (`#0d0d0d` bg, `#498cdf` accent, Inter font)

## Technical notes

- Channel resolution uses `channels.list?forHandle=@handle` (1 quota unit each, done once and cached)
- `search.list` costs 100 units per call → with 1-hour cache that's ~48 calls/day per channel = well within quota
- No user auth needed — videos are public, anyone visiting the site sees them
- If you later want per-video analytics or comments, we can extend the same edge function

## Out of scope (ask if you want them)

- Embedded video player on the page (currently: thumbnail → opens YouTube)
- Full video archive / search page
- Subscriber count or view count badges
