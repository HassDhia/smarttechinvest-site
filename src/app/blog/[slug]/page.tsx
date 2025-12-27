import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | STI Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Hass Dhia'],
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[hsl(var(--foreground-secondary))] mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.author && (
              <>
                <span>·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[hsl(var(--card))] rounded-full text-sm text-[hsl(var(--foreground-secondary))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="
          prose prose-lg max-w-none dark:prose-invert
          prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:my-6 prose-p:leading-relaxed
          prose-a:text-[hsl(var(--brand))] prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:my-8 prose-img:mx-auto
          prose-blockquote:border-l-4 prose-blockquote:border-[hsl(var(--brand))] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8
          prose-strong:text-[hsl(var(--foreground))]
          prose-hr:my-12 prose-hr:border-[hsl(var(--border))]
          prose-ul:my-6 prose-li:my-2
          prose-pre:bg-[hsl(var(--card))]
        ">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[hsl(var(--border))]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--brand-dark,var(--brand)))] flex items-center justify-center text-xl font-bold text-white">
              H
            </div>
            <div>
              <p className="font-semibold">{post.author || 'Hass Dhia'}</p>
              <p className="text-sm text-[hsl(var(--foreground-secondary))]">
                Chief Strategy Officer at Smart Technology Investments
              </p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
