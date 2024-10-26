import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Accordion, AccordionItem, Dropdown,DropdownItem, DropdownSection, DropdownTrigger, Tooltip, DropdownMenu} from "@nextui-org/react";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ChevronUpIcon, Dot,  } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  interface CollapseMenuButtonProps {
    icon: ReactNode;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
  }
  
  export function CollapseMenuButton({
    icon: Icon,
    label,
    active,
    submenus,
    isOpen
  }: CollapseMenuButtonProps) {
    
    return isOpen ? (
      <Accordion>
        <AccordionItem
        indicator={({isOpen})=>(isOpen?<ChevronUpIcon size={18}/>:<ChevronDownIcon fontSize={18}/>)}
        title={<p className="w-full text-small font-normal">{label}</p>}
        startContent={Icon}
        isCompact={true}
        >

           {
            submenus.map(({href,label,active},index)=>(
                <Button
                key={index}
                variant={active?undefined:"light"}
                className="w-full flex justify-start h-10 mb-1"
                startContent={<Dot size={18}/>}>
                    <Link to={href}>
              <p
                className={cn(
                  "max-w-[170px] truncate",
                  isOpen
                  ? "translate-x-0 opacity-100"
                  :"-translate-x-96 opacity-0"
                )}
              >
                {label}
              </p>
            </Link>
                </Button>
            ))
           }
        </AccordionItem>
      </Accordion>
    ) : (
      <>
      <Dropdown
        >
      <Tooltip
      delay={100}
      content={label}>
          <DropdownTrigger>
            <Button 
            variant={active?undefined:'light'}
            className="flex justify-center items-center w-full h-10 mb-1 hover:bg-primary-300 dark:hover:bg-primary-300"
            isIconOnly
            color={active?'primary':undefined}>
              {Icon}
              {/* <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div> */}
            </Button>
          </DropdownTrigger>
          </Tooltip>
          <DropdownMenu 
          variant="faded"
           >
              
              {/* <Divider className="my-4"/> */}
            <DropdownSection title={label} showDivider={true} >
                {submenus.map(({href,label},index)=>(
                  <DropdownItem key={index}>
                    <Link className="cursor-pointer" to={href}>
                     <p className="max-w-[180px] truncate">{label}</p>
                  </Link>
                  </DropdownItem>
                ))}
                </DropdownSection>
            
              
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }