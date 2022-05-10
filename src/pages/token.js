import { useSearchParams, Navigate } from "react-router-dom";
import { useCurrentUser } from '../js/userContext';
import { GetAccessTokenForUser, SetUserDataInCookie } from '../js/auth';
import { useEffect } from 'react';

 function Token() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { currentUser, fetchCurrentUser } = useCurrentUser();
    let code = searchParams.get("code");
    useEffect(() => {
        if (code !== null) {
            let response = GetAccessTokenForUser(code);
            response.then((data) => {
                SetUserDataInCookie(data.access_token, data.refresh_token);
                fetchCurrentUser();                     
            });
        }
    }, []);
    return (
        <Navigate to="/" />
    );
 }

 export default Token;
