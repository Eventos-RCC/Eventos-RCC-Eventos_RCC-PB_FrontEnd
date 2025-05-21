import { CreateEventCard } from "@/components/custom-components/CreateEventCard";
import { EventCard } from "@/components/custom-components/EventCard";
import { UserHeaderBar } from "@/components/custom-components/UserHeaderBar";
import { AppSidebar } from "@/components/custom-components/UserSideBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar"
import { SquarePen } from "lucide-react";
import { useState } from "react";

export function UserPage({ children }: { children: React.ReactNode }) {

  const [sideBarOption, setSideBarOption] = useState(0);
  const [showCreateEventCard, setShowCreateEventCard] = useState(false);

  function handleMenuClick(option: number) {
    setSideBarOption(option);
    if (option === 1) {
      setShowCreateEventCard(false);
    }
  }

  return (
    <>
      <UserHeaderBar />
      <SidebarProvider >
        <AppSidebar
          onMenuClick={handleMenuClick}
          activeOption={sideBarOption}
        />
        <main className="flex flex-row">
          {/* <SidebarTrigger /> */}
          {children}

          {sideBarOption === 0 && (
            <div className="flex flex-col items-center justify-start ml-16 p-8 w-full h-screen">
              <img
                src="/assets/christmas.png"
                alt="imagem cristã"
                className="w-[300px] h-[300px] mb-4"
              />
              <h1
                className="text-2xl text-center font-normal">
                Olá, seja bem-vindo ao site de eventos da Renovação Carismática Católica da Paraíba!
              </h1>
            </div>
          )}

          {sideBarOption === 1 && (
            <div className="flex flex-col items-center justify-start gap-2 p-8 w-full h-screen">
              {showCreateEventCard ? (
                <div className="ml-18">
                  <CreateEventCard />
                </div>
              ) : (
                <>
                  <div className="flex justify-end w-full">
                    <Button
                      className="bg-green-600 w-48 hover:bg-green-700 hover:cursor-pointer"
                      onClick={() => setShowCreateEventCard(true)}>
                      <SquarePen />
                      Criar evento
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                  </div>
                </>
              )}
            </div>
          )}

        </main>
      </SidebarProvider>
    </>
  );
}
