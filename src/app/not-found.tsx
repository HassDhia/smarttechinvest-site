import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Page Not Found - STI',
  description: 'The page you&apos;re looking for doesn&apos;t exist.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-[hsl(var(--primary))] mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-2">
            Page not found
          </h2>
        </div>

        <p className="text-[hsl(var(--foreground-secondary))] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="primary" size="md">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
