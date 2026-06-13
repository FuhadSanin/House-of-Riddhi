import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function AdminImagePreviewInner({ trimmed, alt, className, size = "md" }) {
  const [failed, setFailed] = useState(false);

  const box =
    size === "sm"
      ? "size-14 rounded-lg"
      : size === "lg"
        ? "aspect-square w-full max-w-[220px] rounded-xl"
        : "aspect-video w-full max-w-md rounded-xl";

  if (!trimmed || failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-1 border border-dashed border-border bg-muted/50 text-center text-muted-foreground",
          box,
          className
        )}
      >
        <ImageIcon className={size === "sm" ? "size-5 opacity-50" : "size-8 opacity-40"} aria-hidden />
        {size !== "sm" ? (
          <span className="px-2 text-xs text-muted-foreground">
            {failed && trimmed ? "Could not load — use a direct image URL (.jpg, .png, .webp or /path)" : "Image preview"}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden border border-border bg-muted/30", box, className)}>
      <img
        src={trimmed}
        alt={alt || "Preview"}
        className="size-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/** Remounts when `src` changes so load error state resets without an effect. */
export function AdminImagePreview({ src, alt, className, size }) {
  const trimmed = src?.trim() ?? "";
  return <AdminImagePreviewInner key={trimmed} trimmed={trimmed} alt={alt} className={className} size={size} />;
}
