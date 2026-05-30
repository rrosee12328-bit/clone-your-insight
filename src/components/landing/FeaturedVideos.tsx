import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, BookOpen, Cpu, ArrowRight } from "lucide-react";
import { supabase, type YoutubeVideo, type YoutubeVideosResponse } from "@/lib/supabase";

const LANES = [
  {
    key: "faith" as const,
    label: "Faith & Wisdom",
    Icon: BookOpen,
    channelUrl: "https://www.youtube.com/@biblestudywithrickyrose",
  },
  {
    key: "business" as const,
    label: "AI & Business",
    Icon: Cpu,
    channelUrl: "https://www.youtube.com/@learningwithrickylrose",
  },
];

const VideoCard = ({ video }: { video: YoutubeVideo }) => (
  <a
    href={video.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-secondary/40">
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
        <Play className="w-10 h-10 text-primary" fill="currentColor" />
      </div>
    </div>
    <p className="text-sm font-semibold mt-3 line-clamp-2 group-hover:text-primary transition-colors">
      {video.title}
    </p>
    <p className="text-xs text-muted-foreground mt-1">
      {new Date(video.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  </a>
);

const SkeletonCard = () => (
  <div>
    <div className="aspect-video rounded-lg bg-secondary/40 border border-border animate-pulse" />
    <div className="h-4 w-3/4 mt-3 rounded bg-secondary/40 animate-pulse" />
    <div className="h-3 w-1/3 mt-2 rounded bg-secondary/40 animate-pulse" />
  </div>
);

const FeaturedVideos = () => {
  const [data, setData] = useState<YoutubeVideosResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.functions.invoke<YoutubeVideosResponse>(
        "get-youtube-videos",
      );
      if (cancelled) return;
      if (error || !data) {
        setError(error?.message ?? "Failed to load videos");
      } else {
        setData(data);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="latest" className="py-16 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Latest from both sides</h2>
          <p className="text-muted-foreground">
            Fresh teachings, ideas, and conversations — straight from YouTube.
          </p>
        </motion.div>

        <div className="space-y-12">
          {LANES.map(({ key, label, Icon, channelUrl }) => {
            const videos = data?.[key] ?? [];
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </div>
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    View channel <ArrowRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {loading &&
                    Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                  {!loading &&
                    videos.slice(0, 3).map((v) => <VideoCard key={v.id} video={v} />)}
                  {!loading && videos.length === 0 && !error && (
                    <p className="text-sm text-muted-foreground col-span-full">
                      No videos available yet.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          {error && (
            <p className="text-sm text-muted-foreground">
              Couldn't load videos right now. Try again later.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
