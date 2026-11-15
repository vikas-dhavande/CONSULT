import * as React from "react";
import { cn } from "cn";

export function FieldGroup({ className, ...props }) {
  return <div className={cn("grid gap-4", className)} {...props} />;
}

export function Field({ className, ...props }) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

export function FieldLabel({ className, htmlFor, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-xs text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

export function FieldSeparator({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative my-2 text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border",
        className
      )}
      {...props}
    >
      <span
        data-slot="field-separator-content"
        className="relative z-10 bg-card px-2 text-muted-foreground"
      >
        {children}
      </span>
    </div>
  );
}
