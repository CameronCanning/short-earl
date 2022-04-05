
export const validateAlias = (alias) => {
    const re = /^[A-Za-z0-9_-]{3,21}$/

    if (re.test(alias)) return true;
    return false;
}


export const validateURL = (url) => {
    let urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      );

    if (urlPattern.test(url)) return true;    
    return false;
}