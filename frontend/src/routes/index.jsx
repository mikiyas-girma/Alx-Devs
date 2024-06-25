import React from "react";
import PathConstants from "./pathConstants";


const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))
const SIGNUP = React.lazy(() => import("../pages/Signup"))


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About />},
    { path: PathConstants.SIGNUP, element: <SIGNUP />}
]


export default routes;
