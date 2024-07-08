import React from "react";
import PathConstants from "@/routes/pathConstants";
import { getCookie } from "./utilities";
import { Navigate } from "react-router-dom";


const isAuthenticated = () => {
    const token = getCookie("csrf_access_token");
    return token ? true : false;
};


const ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to={PathConstants.LOGIN} />;
};


export default ProtectedRoute;
