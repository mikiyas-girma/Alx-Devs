import React from "react";
import PathConstants from "./pathConstants";


const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))
const SIGNUP = React.lazy(() => import("../pages/Signup"))
const LOGIN = React.lazy(() => import("../pages/Login"))
const Profile = React.lazy(() => import("../pages/Profile"))
const Project = React.lazy(() => import("../pages/Project"))
const CreateProject = React.lazy(() => import("../pages/CreateProject"))


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About />},
    { path: PathConstants.SIGNUP, element: <SIGNUP />},
    { path: PathConstants.LOGIN, element: <LOGIN />},
    { path: PathConstants.PROFILE, element: <Profile />},
    { path: PathConstants.PROJECT, element: <Project />},
    { path: PathConstants.CREATE_PROJECT, element: <CreateProject />}
]


export default routes;
