export const getUrlParams = search => {
    const hashes = search.slice(search.indexOf('?') + 1).split('&');
	return hashes.reduce((params, hash) => {
		let [key, val] = hash.split('=');
		return Object.assign(params, { [key]: decodeURIComponent(val) });
	}, {});
};
