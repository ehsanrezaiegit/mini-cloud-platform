import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary/55 focus:ring-2 focus:ring-primary/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
