import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-input/90 bg-card/60 px-3.5 py-3 text-sm text-foreground shadow-premium-sm backdrop-blur-sm transition-[border-color,box-shadow] duration-300 placeholder:text-muted-foreground focus-visible:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
