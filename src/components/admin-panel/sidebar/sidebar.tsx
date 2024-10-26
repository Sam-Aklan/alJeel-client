import { PanelsTopLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/use-store";
import { useSidebarToggle } from "@/store/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";
import { Menu } from "./Menu";
import { AcmeLogo } from "./Logo";
export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto overflow-x-hidden shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="light"
          startContent={sidebar.isOpen?<AcmeLogo/>: undefined}
          isIconOnly={!sidebar.isOpen?true:false}
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            {!sidebar.isOpen?<AcmeLogo/>:<>
            
            <h1
              className=
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300"
            >
              Brand
            </h1>
            </>
            }
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}