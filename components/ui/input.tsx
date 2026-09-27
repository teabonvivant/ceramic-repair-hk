import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "motion-soft flex min-h-[52px] w-full rounded-none border-0 border-b border-line bg-transparent px-4 py-3 text-base text-ink placeholder:text-ink-soft hover:border-celadon focus-visible:border-celadon",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };

