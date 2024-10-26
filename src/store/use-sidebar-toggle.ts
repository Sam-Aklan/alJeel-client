import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface useSidebarToggleStore {
  isOpen: boolean;
  setIsOpen: () => void;
  dashboardTitle?:string;
  setDashboardTitle: (title:string)=> void
}

export const useSidebarToggle = create(
  persist<useSidebarToggleStore>(
    (set, get) => ({
      isOpen: true,
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
      dashboardTitle:'لوحة التحكم',
      setDashboardTitle:(title)=>set(()=>({dashboardTitle:title}))
    }),
    {
      name: 'sidebarOpen',
      storage: createJSONStorage(() => localStorage)
    }
  )
);