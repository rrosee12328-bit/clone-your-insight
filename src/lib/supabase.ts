import { createClient } from "@supabase/supabase-js";

// Publishable values — safe to ship in the frontend.
const SUPABASE_URL = "https://joulzvwjctfqrhzevnge.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdWx6dndqY3RmcXJoemV2bmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNzg1MDcsImV4cCI6MjA5NTY1NDUwN30.ru1XYEVi4cmO1avvSVkKKmyhk6z3rip2QZgz_oW7DkU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
  shortsUrl: string;
  durationSeconds: number;
};

export type YoutubeContentResponse = {
  videos: YoutubeVideo[];
  shorts: YoutubeVideo[];
  channel2Name?: string;
  channel2Videos?: YoutubeVideo[];
  channel2Shorts?: YoutubeVideo[];
};
