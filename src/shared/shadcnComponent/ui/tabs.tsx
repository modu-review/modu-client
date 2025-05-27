'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import {cn} from '@/shared/lib/utils/cn';

const Tabs = TabsPrimitive.Root;

const tabsTriggerDefaultStyle =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-base md:text-lg font-medium border-2 border-mediumBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all';
const tabsTriggerActiveStyle =
  'data-[state=active]:pb-4 md:data-[state=active]:pb-3.5 data-[state=inactive]:mb-2.5 md:data-[state=inactive]:mb-2 data-[state=active]:bg-lightBlue data-[state=active]:border-lightBlue data-[state=active]:text-boldBlue data-[state=inactive]:hover:bg-lightBlue data-[state=inactive]:hover:text-boldBlue data-[state=inactive]:hover:border-lightBlue data-[state=inactive]:hover:border-lightBlue';

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({className, ...props}, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('inline-flex h-9 items-center justify-center rounded-lg bg-white p-1', className)}
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
    className={cn(tabsTriggerDefaultStyle, tabsTriggerActiveStyle, className)}
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
    className={cn(
      'mt-2.5 md:mt-3 mx-1 p-3 pt-10 md:pt-16 min-h-[280px] rounded-b-md md:min-h-[570px] ring-offset-background bg-lightBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {Tabs, TabsList, TabsTrigger, TabsContent};
