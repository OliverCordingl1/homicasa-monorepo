import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPageSlugs, getPage } from "@/lib/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "@/components/mdx/MDXComponents";

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        {page.title && (
          <header className="max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-900 mb-3">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-lg text-surface-600">{page.description}</p>
            )}
          </header>
        )}
        <article className="prose prose-lg prose-brand max-w-3xl mx-auto prose-headings:font-bold prose-h1:text-5xl md:prose-h1:text-6xl prose-h1:mb-6 prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-lg prose-li:text-lg list-outside">
          <MDXRemote
            source={page.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-light",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
            components={MDXComponents}
          />
        </article>
      </div>
    </div>
  );
}
