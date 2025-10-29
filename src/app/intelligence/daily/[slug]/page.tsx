import { MDXRemote } from 'next-mdx-remote/rsc';
import { DailyMeta } from "../../../../components/DailyMeta";
import { getDailyBySlug, getDailySlugs } from "../../../../lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getDailySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getDailyBySlug(slug);
    
    return {
      title: `${frontmatter.title} | STI Intelligence`,
      description: frontmatter.summary,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.summary,
        type: 'article',
        publishedTime: frontmatter.date,
        images: frontmatter.og ? [frontmatter.og] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: frontmatter.summary,
        images: frontmatter.og ? [frontmatter.og] : [],
      },
    };
  } catch {
    return {
      title: 'Daily Signal | STI Intelligence',
    };
  }
}

export default async function DailyDetailPage({ params }: Props) {
  const { slug } = await params;
  let daily;
  
  try {
    daily = getDailyBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = daily;

  return (
    <div className="font-sans">
      <section className="container section vt-section">
        <div className="mb-6">
          <Link 
            href="/intelligence/daily" 
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Daily Signals
          </Link>
        </div>
        
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="font-extrabold tracking-tight text-[var(--step-4)] text-gradient mb-4">
              {frontmatter.title}
            </h1>
            
            <DailyMeta frontmatter={frontmatter} />
          </header>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MDXRemote source={content} />
          </div>
          
          <footer className="mt-12 pt-8 border-t border-[hsl(var(--border))]">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Read the full brief</h3>
                <Link 
                  href="/intelligence/briefs" 
                  className="text-sm text-[hsl(var(--primary))] hover:underline"
                >
                  Browse Weekly Briefs →
                </Link>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Follow the discussion</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={12} />
                    LinkedIn
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={12} />
                    X/Twitter
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </section>
    </div>
  );
}
