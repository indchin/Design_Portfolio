import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-hairline/10 bg-fill-subtle/[0.06] px-3 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
