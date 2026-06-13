import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_0_hsl(0_0%_0%/0.08),0_10px_28px_-8px_hsl(var(--primary)/0.35)] hover:bg-primary/92 hover:shadow-[0_1px_0_0_hsl(0_0%_0%/0.1),0_14px_36px_-8px_hsl(var(--primary)/0.42)] dark:shadow-[0_1px_0_0_hsl(0_0%_100%/0.08),0_12px_32px_-8px_hsl(0_0%_0%/0.5)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background/90 shadow-premium-sm backdrop-blur-sm hover:bg-accent/80 hover:text-accent-foreground",
        secondary:
          "border border-primary/10 bg-secondary text-secondary-foreground shadow-premium-sm hover:border-primary/15 hover:bg-secondary/85",
        ghost: "hover:bg-accent/60 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 shadow-none hover:underline active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
