import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/components/theme-provider";

/**
 * shadcn-style Sonner toasts; theme follows app light/dark.
 */
export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group border border-border bg-background text-foreground shadow-lg backdrop-blur-sm dark:bg-card",
          title: "text-foreground font-semibold",
          description: "text-muted-foreground",
          success: "border-emerald-500/30 dark:border-emerald-500/40",
          error: "border-destructive/40",
          info: "border-primary/30",
          warning: "border-amber-500/35",
        },
      }}
    />
  );
}
