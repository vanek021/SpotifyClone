import { getToken } from "./cookieManager";
/**
 * Creating request and trying format request response to JSON. If request failed, returns object of Error class with error message. If request success, returns promise.
 * @param  {} request_url - Url of request.
 * @param  {} method - Method of request.
 * @param  {} content_type - Headers content-type.
 */
export async function makeRequest(requestUrl, requestData) {
    const fetchResult = await fetch(requestUrl, requestData)
        .catch((err) => { throw err });
        
    if (fetchResult.ok){
        if (requestData.method === 'GET' || requestData.method === 'POST') 
            return await fetchResult.json();
        else {
            return fetchResult;
        }          
    }     
    else {
        const jsonError = await fetchResult.json();
        throw jsonError;
    }
}

/**
 * Return request headers with provided request method and Authorization Access Token.
 * @param  {} method - Request method.
 * @param  {} contentType - Request content type.
 */
export function getRequestHeadersWithToken(method, contentType = "application/json") {
    return  {
        method: method,
        headers: {
            'Content-Type': contentType,
            'Authorization': 'Bearer ' + getToken()
        },
    };
}

export function getRequestData(contentType, authorization, body) {
    return  {
        method: 'POST',
        headers: {
            'Content-Type': contentType,
            'Authorization': authorization
        },
        body
    };
}