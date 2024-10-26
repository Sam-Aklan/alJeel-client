import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ErrorPage from "@/error-page";
import Root from "@/routes/Root";
import TeacherAddPage from "@/routes/TeacherAddPage";
import TeachersPage from "@/routes/TeachersPage";
import TeacherUpdate from "@/routes/TeacherUpdate";
import LevelClassPage from "@/routes/LevelClassPage";
import { LevelsPage } from "@/routes/LevelsPage";
import { StudentAddPage } from "@/routes/StudentAddPage";
import { StudentPage } from "@/routes/StudentPage";
import Dashboard from "@/routes/Dashboard";
import StudentUpdate from "@/routes/StudentUpdate";

const router = createBrowserRouter([
  
    {
      path:'/',
      element:<Root/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"/",
          element:<Dashboard/>
        },
        {
          path:"/teachers/add",
          element:<TeacherAddPage/>
        },
        {
          path:"/teachers",
          element:<TeachersPage/>
        },
        {
          path:"/teacher/:teacherId",
          element:<TeacherUpdate/>
        },
        {
          path:"/students/add",
          element:<StudentAddPage/>
        },
        {
          path:"/students",
          element:<StudentPage/>
        },
        {
          path:"students/:studentId",
          element:<StudentUpdate/>
        },
        {
          path:"/levels",
          element:<LevelsPage/>
        },
        {
          path:"/levels/:levelId",
          element:<LevelClassPage/>
        },
        {
          path:"/scheduler",
          element: <LevelClassPage/>
        }
      ]
  
    }
  ])

  export function RoutingProvider() {
    return <RouterProvider router={router} />;
  }