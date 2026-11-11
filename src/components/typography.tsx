import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

// The single source for every text level. Components choose a variant; they
// never set their own size, weight, or line height. See design.md 3.2.
const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[1.75rem] font-bold leading-[1.2] tracking-[-0.01em] md:text-[2rem]",
      h2: "text-[1.375rem] font-semibold leading-[1.3] tracking-[-0.005em] md:text-2xl",
      h3: "text-lg font-semibold leading-[1.35]",
      h4: "text-base font-semibold leading-[1.4]",
      body: "text-base leading-[1.5]",
      "body-sm": "text-sm leading-[1.45]",
      label: "text-[0.8125rem] font-medium leading-[1.3]",
      caption: "text-xs leading-[1.4] text-muted-foreground",
      data: "text-sm font-medium leading-[1.4] tabular-nums",
    },
  },
  defaultVariants: { variant: "body" },
});

const elementForVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  "body-sm": "p",
  label: "span",
  caption: "span",
  data: "span",
} as const;

type Variant = keyof typeof elementForVariant;

type TypographyProps = Omit<ComponentPropsWithoutRef<"p">, "color"> &
  VariantProps<typeof typographyVariants> & { as?: ElementType };

export function Typography({
  variant,
  as,
  className,
  ...props
}: TypographyProps) {
  const resolved: Variant = variant ?? "body";
  const Comp: ElementType = as ?? elementForVariant[resolved];
  return (
    <Comp
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}
