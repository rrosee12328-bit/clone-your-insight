import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import StickyNav from "@/components/landing/StickyNav";
import Footer from "@/components/landing/Footer";

type BlogPost = {
  id: string;
  slug: string;
  blog_title: string;
  video_title: string | null;
  thumbnail_url: string | null;
  channel_name: string | null;
  published_at: string | null;
  created_at: string;
};

const stripBold = (text?: string | null) =>
  text ? text.replace(/\*\*/g, "") : "";

const formatDate = (d?: string | null) =>
  d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

const channelBadgeClass = (name?: string | null) => {
  if (name === "Bible Study with Ricky Rose") return "bg-red-600 text-white";
  if (name === "Ricky Rose") return "bg-blue-600 text-white";
  return "bg-secondary text-secondary-foreground";
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setPosts((data as BlogPost[]) ?? []);
      else setPosts([]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav />
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2">Articles, breakdowns, and notes.</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full aspect-video rounded-lg" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="group rounded-lg overflow-hidden border border-border bg-card hover:border-primary/60 transition-colors"
              >
                {p.thumbnail_url && (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={p.thumbnail_url}
                      alt={p.blog_title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  {p.channel_name && (
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded ${channelBadgeClass(p.channel_name)}`}
                    >
                      {p.channel_name}
                    </span>
                  )}
                  <h2 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                    {stripBold(p.video_title ?? p.blog_title)}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(p.published_at ?? p.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No posts yet — check back soon.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
