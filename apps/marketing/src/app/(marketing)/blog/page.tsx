import { getBlogPosts } from "@/lib/mdx";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "Insights, tips, and updates about modern property management",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-surface-600 mb-12">
            Insights, tips, and updates about modern property management
          </p>

          <div className="space-y-8">
            {posts.length === 0 ? (
              <p className="text-surface-600">
                No blog posts yet. Check back soon!
              </p>
            ) : (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex flex-col gap-3">
                      <h2 className="text-2xl font-bold text-brand-900 hover:text-accent-600 transition-colors">
                        {post.title}
                      </h2>

                      <div className="flex items-center gap-4 text-sm text-surface-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime}
                        </div>
                      </div>

                      <p className="text-surface-700">{post.description}</p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="accent">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
