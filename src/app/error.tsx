'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-[hsl(var(--primary))] mb-2">Oops!</h1>
          <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-2">
            Something went wrong
          </h2>
        </div>

        <p className="text-[hsl(var(--foreground-secondary))] mb-6 leading-relaxed">
          We encountered an unexpected error. Our team has been notified and we&apos;re working on a fix.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="primary" size="md">
            <Link href="/">Return Home</Link>
          </Button>
          <Button onClick={reset} variant="outline" size="md">
            Try Again
          </Button>
        </div>

        {error.digest && (
          <p className="text-xs text-[hsl(var(--foreground-tertiary))] mt-6">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
