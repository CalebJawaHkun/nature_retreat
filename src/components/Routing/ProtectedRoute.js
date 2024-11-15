import { Navigate } from "react-router-dom";

export default function ProtectedRoute({isAllowed, redirectPath, children}) {
    if(!isAllowed) return <Navigate to={redirectPath} replace={true}/>;

    return children;
    
}