
export const validateAlias = (alias) => {
    const re = /^[A-Za-z0-9_-]{3,21}$/

    if (re.test(alias)) return true;
    return false;
}

export const validateURL = (_url) => {

    let url;
    try {
        url = new URL(_url);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}

