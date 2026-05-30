import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import StickyNav from "@/components/landing/StickyNav";
import Footer from "@/components/landing/Footer";

type BlogPost = {
  id: string;
  slug: string;
  blog_title: string;
  video_title: string | null;
  blog_content: string | null;
  thumbnail_url: string | null;
  channel_name: string | null;
  video_url: string | null;
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

// Render content preserving line breaks + **bold** markdown
const renderContent = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      setPost((data as BlogPost) ?? null);
      setLoading(false);
    })();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav />
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to blog
        </Link>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : !post ? (
          <div className="text-center py-20 text-muted-foreground">Post not found.</div>
        ) : (
          <article className="space-y-6">
            {post.thumbnail_url && (
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <img src={post.thumbnail_url} alt={post.blog_title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              {post.channel_name && (
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded ${channelBadgeClass(post.channel_name)}`}
                >
                  {post.channel_name}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                {formatDate(post.published_at ?? post.created_at)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{stripBold(post.video_title ?? post.blog_title)}</h1>
            {post.video_url && (
              <Button
                asChild
                className="bg-cta text-cta-foreground hover:bg-cta/90 font-semibold"
              >
                <a href={post.video_url} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            )}
            {post.blog_content && (
              <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {renderContent(post.blog_content)}
              </div>
            )}
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
