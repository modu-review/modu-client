'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import {cn} from '@/shared/lib/utils/cn';

const tabsTriggerActiveAfterContent =
  'data-[state=active]:after:absolute data-[state=active]:after:-top-1.5 md:data-[state=active]:after:-top-2 data-[state=active]:after:animate-fade-in data-[state=active]:after:w-[8px] md:data-[state=active]:after:w-[9px] data-[state=active]:after:h-[8px] md:data-[state=active]:after:h-[9px] data-[state=active]:after:rounded-full data-[state=active]:after:bg-boldBlue';

const tabsTriggerBaseStyle =
  'relative inline-flex w-[100px] md:w-[120px] lg:w-[140px] text-gray-400 mx-auto items-center justify-center whitespace-nowrap px-3 py-1 md:text-lg lg:text-xl font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-b-[4px] border-white';

const tabsTriggerActiveStyle =
  'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:border-b-[3.5px] data-[state=active]:border-boldBlue';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-white p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({className, ...props}, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerBaseStyle, tabsTriggerActiveStyle, tabsTriggerActiveAfterContent, className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({className, ...props}, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-2 bg-gray-100 md:rounded-2xl pt-6 md:pt-8', className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsList, TabsTrigger, TabsContent};
