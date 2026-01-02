import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | Smart Technology Investments',
  description: 'Neuroscience, behavioral economics, and AI—applied to brand partnership strategy.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-xl text-[hsl(var(--foreground-secondary))]">
            Neuroscience, behavioral economics, and AI—applied to brand partnership strategy.
          </p>
        </header>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 text-[hsl(var(--foreground-secondary))]">
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-[hsl(var(--border))] pb-12 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative aspect-[16/9] mb-6 rounded-lg overflow-hidden bg-[hsl(var(--card))]">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-[hsl(var(--foreground-secondary))] mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span>·</span>
                        <div className="flex gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[hsl(var(--card))] rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-[hsl(var(--brand))] transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[hsl(var(--foreground-secondary))] text-lg leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <span className="inline-block mt-4 text-[hsl(var(--brand))] font-medium group-hover:opacity-80 transition-opacity">
                    Read more →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
