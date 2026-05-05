import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ContactAvatarProps {
  initials: string;
  colorClass: string;
  size?: "sm" | "md";
  isOnline?: boolean;
}

export function ContactAvatar({
  initials,
  colorClass,
  size = "md",
  isOnline,
}: ContactAvatarProps) {
  return (
    <div className="relative shrink-0">
      <Avatar className={cn(size === "sm" ? "h-9 w-9" : "h-10 w-10")}>
        <AvatarFallback
          className={cn(
            "bg-gradient-to-br text-white font-semibold",
            size === "sm" ? "text-[11px]" : "text-xs",
            colorClass
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
      )}
    </div>
  );
}
