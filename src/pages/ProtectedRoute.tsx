import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface ProtectedReactProps {
    component: React.ComponentType;
}

const ProtectedRoute = ({component: Component}: ProtectedReactProps) => {
    const [, navigate] = useLocation();
    const[loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetch("/api/auth/me", {
            credentials: "include",
        }).then((res) => {
            if(res.ok){
                setAuthenticated(true);
            } else{
                navigate("/");
            }
        }) .catch(() => {
            navigate("/");
        }).finally(() => {
            setLoading(false);
        });
    }, [navigate]);

    if(loading){
        return(
            <div>Checking Auth....</div>
        )
    }

    if(!authenticated) return null;

    return <Component />;
}

export default ProtectedRoute;