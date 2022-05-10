import { GetTokenCookieValue } from "./cookieManager";
/**
 * Creating request and trying format request response to JSON. If request failed, returns object of Error class with error message. If request success, returns promise.
 * @param  {} request_url - Url of request.
 * @param  {} method - Method of request.
 * @param  {} content_type - Headers content-type.
 */
export async function MakeRequest(request_url, method, content_type) {
    const fetchResult = await fetch(request_url, GetRequestHeadersWithToken(method, content_type))
        .catch((err) => console.log(err));
        
    if (fetchResult.ok){
        if (method === 'GET' || method === 'get') 
            return await fetchResult.json();
        else
            return fetchResult;
    }     
    else {
        let jsonError = await fetchResult.json();
        return new Error(jsonError.error.status + ' ' + jsonError.error.message);
    }
}
/**
 * Return request headers with provided request method and Authorization Access Token.
 * @param  {} method - Request method.
 * @param  {} content_type - Request content type.
 */
export function GetRequestHeadersWithToken(method, content_type) {
    return  {
        method: method,
        headers: {
            'Content-Type': content_type,
            'Authorization': 'Bearer ' + GetTokenCookieValue()
        },
    };
}