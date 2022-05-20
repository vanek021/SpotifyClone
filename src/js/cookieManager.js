/**
 * Check if cookie by provided key is exists. Return true, if yes, false, if no.
 * @param  {} key - Key of cookie.
 */
export function cookieExists(key) {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith(`${key}=`)).length)
        return true;
    else
        return false;
}

/**
 * Set cookie on path "/"
 * @param  {} key - Key of cookie.
 * @param  {} value - Value of cookie.
 */
export function setCookie(key, value) {
    document.cookie=`${key}=${value}; path=/`;
}

/**
 * Get token cookie record by default path
 */
export function getToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

/**
 * Get refresh_token cookie record by default path
 */
export function getRefreshToken() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

/**
 * Get spotify_id cookie record by default path
 */
export function getUserId() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)spotify_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

/**
 * Get token_expire_time cookie record by default path
 */
export function getTokenExpireTime() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token_expire_time\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}