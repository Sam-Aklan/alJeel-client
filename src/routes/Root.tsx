import AdminPanelLayout from '@/components/admin-panel/admin-layout';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { useSidebarToggle } from '@/store/use-sidebar-toggle';
import { useStore } from '@/store/use-store';

import { Outlet } from "react-router-dom";

const Root = () => {
  const dashboardTitle = useStore(useSidebarToggle,(state)=>state.dashboardTitle)
  return (
      <div className="flex-1 overflow-x-hidden">
       <AdminPanelLayout>
        <ContentLayout title={dashboardTitle || 'لوحة التحكم'}>
          <Outlet/>
        </ContentLayout>
       </AdminPanelLayout>
        {/* <div className="flex flex-1">
        </div> */}
      </div>
        )
}

export default Root