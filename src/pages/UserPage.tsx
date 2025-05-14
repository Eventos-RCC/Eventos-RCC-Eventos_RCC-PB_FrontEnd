import { UserHeaderBar } from "@/components/custom-components/UserHeaderBar";
import { AppSidebar } from "@/components/custom-components/UserSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export function UserPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserHeaderBar />
      <SidebarProvider className="h-screen">
          <AppSidebar />
          <main className="flex-1">
            {/* <SidebarTrigger /> */}
            {children}
          </main>
      </SidebarProvider>
    </>
  );
}
