import { cn } from '@/lib/utils'
import { getMenuList } from '@/components/admin-panel/sidebar/menuList.tsx'
import { Link, useLocation } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button, Tooltip } from '@nextui-org/react'
import { Ellipsis, LogOut } from 'lucide-react'
import { CollapseMenuButton } from './collapse-menu-button.tsx.tsx'
import { useStore } from 'zustand'
import { useSidebarToggle } from '@/store/use-sidebar-toggle.ts'

interface menuProps{
    isOpen:boolean|undefined
}
export const Menu = ({isOpen}:menuProps) => {
    const location = useLocation()
    const menuList = getMenuList({pathname:location.pathname,iconSize:18})
    const setTitle =useStore(useSidebarToggle,(state)=>state.setDashboardTitle)
  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <Tooltip
                delay={100}
                content={<p>{groupLabel}</p>}>
                    <div className="w-full flex justify-center items-center">
                    <Ellipsis className='h-5 w-5'/>
                    </div>
                </Tooltip>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full flex flex-col gap-2" key={index}>
                      <Tooltip
                      delay={100}
                      content={label}
                      isDisabled={isOpen}
                      >
                        <Button
                        variant={active?undefined:'light'} startContent={isOpen?Icon:undefined}
                        color={active?"primary":undefined}
                        className={cn('flex  w-full hover:bg-primary-200',isOpen?'justify-start':'justify-center items-center')}
                        radius='sm'
                        isIconOnly={!isOpen?true:false}
                        onClick={()=> setTitle(label)}
                        >
                            <Link to={href}>
                                {!isOpen?Icon:<p className={cn('max-w-[200px] truncate',isOpen?'translate-x-0 opacity-100':"-translate-x-96 opacity-0")}>
                                  {isOpen?label:undefined}
                                </p>}
                                
                            </Link>
                        </Button>
                      </Tooltip>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
           <Tooltip
           delay={100}
           content={"Sign out"}>
            <Button
            onClick={()=>{}}
            variant='light'
            className='w-full flex justify-center items-center h-10 mt-5 mb-5'
            startContent={isOpen?<LogOut size={18}/>: undefined}
            isIconOnly={!isOpen?true:false}
            >
               {!isOpen?<LogOut size={18}/>: <>
                {/* <span className={cn(isOpen?'mr-4':'')}>
                    <LogOut size={18}/>
                </span> */}
                <p className={cn('whitespace-nowrap',
                    isOpen?'opacity-100':'opacity-0 hidden'
                )}>
                    تسجيل الخروج
                </p>
               </>}
            </Button>
           </Tooltip>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  )
}
