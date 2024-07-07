import React from "react";
import PathConstants from "./pathConstants";
import ProtectedRoute from "@/utils/ProtectedRoute";


const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))
const SIGNUP = React.lazy(() => import("../pages/Signup"))
const LOGIN = React.lazy(() => import("../pages/Login"))
const Profile = React.lazy(() => import("../pages/Profile"))
const Project = React.lazy(() => import("../pages/Project"))
const CreateProject = React.lazy(() => import("../pages/CreateProject"))
const MyProjects = React.lazy(() => import("../pages/MyProjects"))
const LandingPage = React.lazy(() => import("../pages/LandingPage"))


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About />},
    { path: PathConstants.SIGNUP, element: <SIGNUP />},
    { path: PathConstants.LOGIN, element: <LOGIN />},
    { path: PathConstants.PROFILE, element: <ProtectedRoute element={<Profile />} /> },
    { path: PathConstants.PROJECT, element: <ProtectedRoute element={<Project />} /> },
    { path: PathConstants.CREATE_PROJECT, element: <ProtectedRoute element={<CreateProject />} /> },
    { path: PathConstants.MY_PROJECTS, element: <ProtectedRoute element={<MyProjects />} /> },
    { path: PathConstants.LANDING, element: <LandingPage />}
]


export default routes;
