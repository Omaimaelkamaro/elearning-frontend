import * as React from "react"
<<<<<<< HEAD
import { cva } from "class-variance-authority"
=======
import { cva } from "class-variance-authority";
>>>>>>> 0118a802aba13f3bae0b045ae86e64d956256e45

import { cn } from "@/lib/utils"

const badgeVariants = cva(
<<<<<<< HEAD
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
=======
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
>>>>>>> 0118a802aba13f3bae0b045ae86e64d956256e45
  {
    variants: {
      variant: {
        default:
<<<<<<< HEAD
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
=======
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
>>>>>>> 0118a802aba13f3bae0b045ae86e64d956256e45
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

<<<<<<< HEAD
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
=======
function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
>>>>>>> 0118a802aba13f3bae0b045ae86e64d956256e45
