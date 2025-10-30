import { cn } from '@/lib/utils';
import { FileSignature } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <FileSignature className="h-6 w-6 text-primary" />
      <span className="font-headline text-lg font-semibold text-foreground">
        FormaText Pro
      </span>
    </div>
  );
}
