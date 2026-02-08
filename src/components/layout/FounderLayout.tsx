import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FounderSidebar } from "./FounderSidebar";

interface FounderLayoutProps {
  children: ReactNode;
}

export function FounderLayout({ children }: FounderLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <FounderSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
