"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { LineBox } from "@/components/LineBox";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("rounded-none border-none p-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    lineBoxDelay?:
      | number
      | {
          t?: number;
          b?: number;
          l?: number;
          r?: number;
        };
  }
>(({ className, children, lineBoxDelay = 0, ...props }, ref) => (
  <LineBox fullWidth={false} b delay={lineBoxDelay}>
    <AccordionPrimitive.Header className="flex p-0">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between !rounded-none !p-8 text-left !font-display !text-2xl font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
          className,
        )}
        {...props}
      >
        {children}
        <PlusIcon
          width={24}
          height={24}
          strokeWidth={80}
          className="shrink-0 opacity-100 transition-transform duration-200"
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  </LineBox>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    lineBoxDelay?:
      | number
      | {
          t?: number;
          b?: number;
          l?: number;
          r?: number;
        };
  }
>(({ className, children, lineBoxDelay = 0, ...props }, ref) => (
  <LineBox fullWidth={false} b delay={lineBoxDelay}>
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden bg-blue-500 !p-8 font-body text-xl transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("!p-0 max-w-[75ch]", className)}>{children}</div>
    </AccordionPrimitive.Content>
  </LineBox>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
