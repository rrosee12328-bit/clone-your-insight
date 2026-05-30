// Edge function: get-youtube-videos
// Fetches latest 6 videos from two YouTube channels, cached in Postgres for 1 hour.
// Deploy this in Supabase Dashboard → Edge Functions → New function → name: get-youtube-videos
// Set the YOUTUBE_API_KEY secret on the function before invoking.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const CHANNELS = [
  { lane: "faith", handle: "BibleStudywithRickyRose" },
  { lane: "business", handle: "Learningwithrickylrose" },
] as const;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function resolveChannelId(handle: string, apiKey: string): Promise<string> {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=@${handle}&key=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`channels.list ${r.status}: ${await r.text()}`);
  const data = await r.json();
  const id = data.items?.[0]?.id;
  if (!id) throw new Error(`No channel for @${handle}`);
  return id;
}

async function fetchLatestVideos(channelId: string, apiKey: string): Promise<Video[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=6&key=${apiKey}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`search.list ${r.status}: ${await r.text()}`);
  const data = await r.json();
  return (data.items ?? [])
    .filter((it: any) => it.id?.videoId)
    .map((it: any) => ({
      id: it.id.videoId,
      title: it.snippet.title,
      thumbnail:
        it.snippet.thumbnails?.high?.url ||
        it.snippet.thumbnails?.medium?.url ||
        it.snippet.thumbnails?.default?.url,
      publishedAt: it.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${it.id.videoId}`,
    }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const YT_KEY = Deno.env.get("YOUTUBE_API_KEY");
    if (!YT_KEY) return json({ error: "YOUTUBE_API_KEY not set" }, 500);

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    // Read existing cache
    const { data: cacheRows } = await supabase
      .from("youtube_videos_cache")
      .select("lane, payload, fetched_at");

    const cacheMap = new Map<string, { payload: Video[]; fetched_at: string }>();
    for (const row of cacheRows ?? []) {
      cacheMap.set(row.lane, { payload: row.payload, fetched_at: row.fetched_at });
    }

    const result: Record<string, Video[]> = {};
    const now = Date.now();

    for (const { lane, handle } of CHANNELS) {
      const cached = cacheMap.get(lane);
      const isFresh =
        cached && now - new Date(cached.fetched_at).getTime() < CACHE_TTL_MS;

      if (isFresh) {
        result[lane] = cached!.payload;
        continue;
      }

      try {
        const channelId = await resolveChannelId(handle, YT_KEY);
        const videos = await fetchLatestVideos(channelId, YT_KEY);
        result[lane] = videos;

        await supabase
          .from("youtube_videos_cache")
          .upsert(
            { lane, payload: videos, fetched_at: new Date().toISOString() },
            { onConflict: "lane" },
          );
      } catch (e) {
        console.error(`Failed to refresh ${lane}:`, e);
        // Fall back to stale cache if available
        result[lane] = cached?.payload ?? [];
      }
    }

    return json(result);
  } catch (e) {
    console.error(e);
    return json({ error: (e as Error).message }, 500);
  }
});
