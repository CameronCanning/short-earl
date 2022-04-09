export const VALID = ''; //'valid' for green border
export const INVALID = 'is-invalid'

const validateAlias = (alias) => {
	const earlPattern = /^[A-Za-z0-9_-]{3,21}$/

	if (alias && !earlPattern.test(alias)) return {status: INVALID, error: 'Must be 3-20 characters using only Aa-Zz, 0-9, -, _'};
	return {status: VALID, error: ''};
}


const validateURL = (url) => {
	let urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$',
		'i'
	);
	if (url.length === 0) return {status: INVALID, error: 'URL Required'}; //Empty field	
	else if (url.length >= 10000) return {status: INVALID, error: 'URL must be less than 10000 characters'}; //Too Long	
	else if (!urlPattern.test(url)) return {status: INVALID, error: 'Invalid URL'}; //Invalid URL
	return {status: VALID, error: ''};
}

export const validateEarl = (earl) => {
	console.log('val');
	return {
		long: validateURL(earl.long),
		short: validateAlias(earl.short)
	}
}