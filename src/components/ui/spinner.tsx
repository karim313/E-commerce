import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div 
      role="status"
      aria-label="Loading"
      className={cn("relative flex items-center justify-center", className)}
      {...props}
    >
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800 opacity-20"></div>
      <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
    </div>
  )
}

export { Spinner }
