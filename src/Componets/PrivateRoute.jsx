import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const Login = localStorage.getItem("Login") === "true"
    console.log(Login);


    return (
        <>
            {Login ? children : <Navigate to="/login" />}
        </>
    );
};
