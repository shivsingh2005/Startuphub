import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { InvestorSidebar } from "./InvestorSidebar";

interface InvestorLayoutProps {
  children: ReactNode;
}

export function InvestorLayout({ children }: InvestorLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <InvestorSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
