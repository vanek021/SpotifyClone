import { useSearchParams, Navigate } from "react-router-dom";
import { useCurrentUser } from '../js/userContext';
import { setAccessTokenForUser, setUserDataInCookie } from '../js/auth';
import { useEffect } from 'react';

 function Token() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { currentUser, fetchCurrentUser } = useCurrentUser();
    let code = searchParams.get("code");
    useEffect(() => {
        if (code !== null){
            setAccessTokenForUser(code)
            .then(response => fetchCurrentUser());
        }          
    }, []);
    return (
        <Navigate to="/" />
    );
 }

 export default Token;
