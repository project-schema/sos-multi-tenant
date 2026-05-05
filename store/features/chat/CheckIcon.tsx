import { cn } from "@/lib/utils";

type CheckType = "single" | "double" | "read";

interface CheckIconProps {
  type: CheckType;
  className?: string;
}

export function CheckIcon({ type, className }: CheckIconProps) {
  if (type === "single") {
    return (
      <svg
        className={cn("h-3 w-3 text-muted-foreground shrink-0", className)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }

  const isRead = type === "read";

  return (
    <svg
      className={cn(
        "h-3.5 w-3.5 shrink-0",
        isRead ? "text-green-500" : "text-muted-foreground",
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="20 6 9 17 4 12" />
      <polyline points="16 6 5 17 0 12" />
    </svg>
  );
}
