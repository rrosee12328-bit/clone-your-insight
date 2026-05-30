## Goal

Pull the latest videos from your two YouTube channels into the Featured Videos section, using your existing Supabase project (`joulzvwjctfqrhzevnge`) for caching and an edge function as the YouTube API proxy.

- **Faith & Wisdom** → `@biblestudywithrickyrose`
- **AI & Business** → `@learningwithrickylrose`

## Split of work

Because your Supabase isn't OAuth-linked to Lovable, I can build everything but cannot push schema or deploy functions for you. You'll do two short manual steps in the Supabase dashboard. I'll give you copy-paste-ready SQL and function code.

### What you'll do (≈5 min)

1. **Add 4 secrets in Lovable** (I'll trigger the secure prompt):
   - `SUPABASE_URL` = `https://joulzvwjctfqrhzevnge.supabase.co`
   - `SUPABASE_ANON_KEY` (Supabase → Project Settings → API → `anon public`)
   - `SUPABASE_SERVICE_ROLE_KEY` (same page, `service_role` — keep private)
   - `YOUTUBE_API_KEY` (Google Cloud Console → enable YouTube Data API v3 → create API key)
2. **Run one SQL block** in Supabase → SQL Editor (I'll provide it)
3. **Deploy one edge function** in Supabase → Edge Functions → "New function" → paste the code I provide → set the `YOUTUBE_API_KEY` secret on the function

### What I'll do

1. **Frontend `.env`-style wiring**: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` reads, create `src/lib/supabase.ts` client
2. **Rewrite `LatestContent.tsx`** (or split into `FeaturedVideos.tsx`):
   - On mount, call the edge function via `supabase.functions.invoke('get-youtube-videos')`
   - Render two rows of 3 video cards (Faith row + AI/Business row)
   - Each card: thumbnail, title, publish date, click → opens YouTube in new tab
   - Loading skeletons; graceful fallback to current placeholders on error
   - Keeps the dark theme tokens (`#0d0d0d`, `#498cdf`, Inter)
3. **Hand you the SQL** for the cache table + RLS policies
4. **Hand you the edge function code** (`get-youtube-videos/index.ts`) with CORS, 1-hour cache, channel-handle resolution, quota-safe fetching

## Technical details

### SQL you'll run (I'll output exact text when we're in build mode)

```text
create table public.youtube_videos_cache (
  id uuid primary key default gen_random_uuid(),
  lane text not null unique,           -- 'faith' | 'business'
  payload jsonb not null,
  fetched_at timestamptz not null default now()
);

grant select on public.youtube_videos_cache to anon, authenticated;
grant all on public.youtube_videos_cache to service_role;

alter table public.youtube_videos_cache enable row level security;

create policy "public read"
  on public.youtube_videos_cache for select
  to anon, authenticated using (true);
```

(Service role bypasses RLS, so writes from the edge function work automatically.)

### Edge function behavior

```text
GET /get-youtube-videos
  ├─ check cache row per lane; if fetched_at < 1h old → return cached payload
  └─ else:
       ├─ resolve @handle → channelId (channels.list?forHandle=…)   [1 unit]
       ├─ search.list?channelId=…&order=date&maxResults=6           [100 units]
       ├─ upsert into youtube_videos_cache
       └─ return { faith: [...], business: [...] }
```

Quota math: 2 channels × ~24 refreshes/day = 4,800 units/day, well under the 10,000 free quota.

### Frontend file layout

```text
src/
├── lib/supabase.ts                 (new — typed client)
├── components/landing/
│   ├── LatestContent.tsx           (edited — wire featured videos to edge fn)
│   └── FeaturedVideos.tsx          (optional split for cleanliness)
```

## Out of scope (ask if you want)

- Embedded YouTube player (currently: thumbnail click → opens YouTube)
- View / subscriber counts on the cards
- Admin-controlled featured override (manually pin a video)

## What happens after you approve

1. I switch to build mode and trigger the secrets prompt for the 4 keys
2. Once secrets are in, I build the frontend + give you the SQL block and edge-function code as two copy-pastes
3. You run the SQL + deploy the function (≈3 min)
4. We refresh the preview and confirm videos load
