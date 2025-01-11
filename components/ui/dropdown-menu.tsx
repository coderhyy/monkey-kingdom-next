"use client";

import { cn } from "@/app/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  ComponentPropsWithoutRef,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Context
interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(
  null
);

// Content
interface ContentProps {
  asChild?: boolean;
  children: React.ReactNode;
}

// Root
interface DropdownMenuRootProps {
  children: React.ReactNode;
}

// Item
interface ItemProps extends ComponentPropsWithoutRef<"li"> {
  asChild?: boolean;
  children: React.ReactNode;
}

// Trigger
interface TriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export function DropdownMenuContent({ asChild, children }: ContentProps) {
  const context = useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenuContent must be used within DropdownMenuRoot");

  const { open, setOpen } = context;
  const ref = useRef<HTMLUListElement>(null);
  const Comp = asChild ? Slot : "ul";

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;
      if (!node || node.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [setOpen]);

  return (
    <Comp
      className={cn(
        "invisible absolute right-0 top-full grid gap-2 rounded-xl",
        "border border-gray-700 bg-gray-800/95 p-2 opacity-0",
        "transition-all duration-200",
        open && "opacity-100 visible translate-y-2"
      )}
      ref={ref}
    >
      {children}
    </Comp>
  );
}

export function DropdownMenuItem({ asChild, children, ...props }: ItemProps) {
  const Comp = asChild ? Slot : "li";

  return (
    <Comp
      className={cn(
        "cursor-pointer rounded-lg p-2 text-center text-sm font-semibold",
        "hover:bg-blue-500/10 hover:text-blue-400",
        props.className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function DropdownMenuRoot({ children }: DropdownMenuRootProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }: TriggerProps) {
  const context = useContext(DropdownMenuContext);
  if (!context)
    throw new Error("DropdownMenuTrigger must be used within DropdownMenuRoot");

  const { open, setOpen } = context;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "break-keep rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-2",
        "font-medium text-gray-100 transition-all",
        "hover:border-blue-500/20 hover:bg-gray-700/50"
      )}
      onClick={() => setOpen(!open)}
    >
      {children}
    </Comp>
  );
}

// 导出组合组件
export const DropdownMenu = {
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
};
