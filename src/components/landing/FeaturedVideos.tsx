import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, BookOpen, ArrowRight, Zap } from "lucide-react";
import {
  supabase,
  type YoutubeVideo,
  type YoutubeContentResponse,
} from "@/lib/supabase";

const formatDuration = (seconds: number) => {
  if (!seconds || seconds < 0) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};


const openExternal = (url: string) => {
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    // Fallback if popups are blocked (e.g. sandboxed preview iframe)
    if (window.top) window.top.location.href = url;
    else window.location.href = url;
  }
};

const VideoCard = ({ video }: { video: YoutubeVideo }) => {
  const url = video.videoUrl || `https://www.youtube.com/watch?v=${video.id}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openExternal(url);
      }}
      className="group block cursor-pointer"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-secondary/40">
        <img
          src={video.thumbnailUrl}
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
};

const ShortCard = ({ short }: { short: YoutubeVideo }) => {
  const duration = formatDuration(short.durationSeconds);
  const url = short.shortsUrl || `https://www.youtube.com/shorts/${short.id}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openExternal(url);
      }}
      className="group block flex-shrink-0 w-40 sm:w-48 cursor-pointer"
    >
      <div className="relative aspect-[9/16] rounded-lg overflow-hidden border border-border bg-secondary/40">
        <img
          src={short.thumbnailUrl}
          alt={short.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-8 h-8 text-primary" fill="currentColor" />
        </div>
        {duration && (
          <span className="absolute bottom-2 right-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-black/80 text-white">
            {duration}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold mt-2 line-clamp-2 group-hover:text-primary transition-colors">
        {short.title}
      </p>
    </a>
  );
};


const VideoSkeleton = () => (
  <div>
    <div className="aspect-video rounded-lg bg-secondary/40 border border-border animate-pulse" />
    <div className="h-4 w-3/4 mt-3 rounded bg-secondary/40 animate-pulse" />
    <div className="h-3 w-1/3 mt-2 rounded bg-secondary/40 animate-pulse" />
  </div>
);

const ShortSkeleton = () => (
  <div className="flex-shrink-0 w-40 sm:w-48">
    <div className="aspect-[9/16] rounded-lg bg-secondary/40 border border-border animate-pulse" />
    <div className="h-3 w-3/4 mt-2 rounded bg-secondary/40 animate-pulse" />
  </div>
);

const FeaturedVideos = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [shorts, setShorts] = useState<YoutubeVideo[]>([]);
  const [channelName, setChannelName] = useState<string>("Bible Study with Ricky Rose");
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [channel2Name, setChannel2Name] = useState<string>("");
  const [channel2Url, setChannel2Url] = useState<string>("");
  const [channel2Videos, setChannel2Videos] = useState<YoutubeVideo[]>([]);
  const [channel2Shorts, setChannel2Shorts] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.functions.invoke<YoutubeContentResponse>(
        "get-youtube-videos",
      );
      if (cancelled) return;
      if (error || !data) {
        setError(error?.message ?? "Failed to load videos");
      } else {
        const hasDuration = (arr: YoutubeVideo[]) => arr.some((v) => (v.durationSeconds ?? 0) > 0);
        const filterLong = (arr: YoutubeVideo[]) =>
          hasDuration(arr) ? arr.filter((v) => (v.durationSeconds ?? 0) > 180) : arr;
        const filterShorts = (arr: YoutubeVideo[]) =>
          hasDuration(arr)
            ? arr.filter((s) => (s.durationSeconds ?? 0) > 0 && s.durationSeconds <= 180)
            : arr;

        setVideos(filterLong(data.videos ?? []));
        setShorts(filterShorts(data.shorts ?? []));
        setChannelName(data.channelName || "Bible Study with Ricky Rose");
        setChannelUrl(data.channelUrl || "");
        setChannel2Name(data.channel2Name ?? "");
        setChannel2Url(data.channel2Url || "");
        setChannel2Videos(filterLong(data.channel2Videos ?? []));
        setChannel2Shorts(filterShorts(data.channel2Shorts ?? []));
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
        {/* Latest Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Latest Videos</h2>
          <p className="text-muted-foreground">
            Fresh teachings, ideas, and conversations.
          </p>
        </motion.div>

        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            Bible Study with Ricky Rose
          </div>
          <a
            href={channelUrl || "https://www.youtube.com/@BibleStudywithRickyRose"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View channel <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <VideoSkeleton key={i} />)}
          {!loading &&
            videos.slice(0, 6).map((v) => <VideoCard key={v.id} video={v} />)}
          {!loading && videos.length === 0 && !error && (
            <p className="text-sm text-muted-foreground col-span-full">
              No videos available yet.
            </p>
          )}
        </div>

        {/* Shorts */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs mb-5">
            <Zap className="w-3.5 h-3.5" />
            Shorts
          </div>

          <div className="-mx-4 px-4 overflow-x-auto scrollbar-thin">
            <div className="flex gap-4 pb-2">
              {loading &&
                Array.from({ length: 6 }).map((_, i) => <ShortSkeleton key={i} />)}
              {!loading &&
                shorts.map((s) => <ShortCard key={s.id} short={s} />)}
              {!loading && shorts.length === 0 && !error && (
                <p className="text-sm text-muted-foreground">
                  No shorts available yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Second channel */}
        {(loading || channel2Videos.length > 0 || channel2Shorts.length > 0) && (
          <div className="mt-20 sm:mt-24">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs">
                <BookOpen className="w-3.5 h-3.5" />
                {channel2Name || "Channel 2"}
              </div>
              {channel2Url && (
                <a
                  href={channel2Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View channel <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading &&
                Array.from({ length: 3 }).map((_, i) => <VideoSkeleton key={i} />)}
              {!loading &&
                channel2Videos.slice(0, 6).map((v) => <VideoCard key={v.id} video={v} />)}
              {!loading && channel2Videos.length === 0 && !error && (
                <p className="text-sm text-muted-foreground col-span-full">
                  No videos available yet.
                </p>
              )}
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs mb-5">
                <Zap className="w-3.5 h-3.5" />
                Shorts
              </div>
              <div className="-mx-4 px-4 overflow-x-auto scrollbar-thin">
                <div className="flex gap-4 pb-2">
                  {loading &&
                    Array.from({ length: 6 }).map((_, i) => <ShortSkeleton key={i} />)}
                  {!loading &&
                    channel2Shorts.map((s) => <ShortCard key={s.id} short={s} />)}
                  {!loading && channel2Shorts.length === 0 && !error && (
                    <p className="text-sm text-muted-foreground">
                      No shorts available yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-muted-foreground mt-6">
            Couldn't load videos right now. Try again later.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedVideos;
