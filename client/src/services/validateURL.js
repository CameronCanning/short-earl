
export const validateAlias = (alias) => {
    const re = /^[A-Za-z0-9_-]{3,21}$/

    if (re.test(alias)) return true;
    return false;
}

export const validateURL = (_url) => {
    if (!/^https?:\/\//i.test(_url)) {
        _url = 'http://' + _url;
    }

    let url;

    try {
        url = new URL(_url); 
        
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

