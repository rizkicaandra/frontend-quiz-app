export function setLocalStorage(key: string, value: any, hour: number) {
	// set expired time
	const now = new Date();

	const item = {
		value: value,
		expires: 0
	};

	if (hour) {
		item.expires = now.getTime() + hour * 60 * 60 * 1000;
	}

	localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorage<T>(key: string): T | null {
	const item = localStorage.getItem(key);
	if (!item) return null;

	const data: { value: T; expires: number } = JSON.parse(item);

	if (data.expires < Date.now() && data.expires !== 0) {
		localStorage.removeItem(key);
		return null;
	}

	return data.value;
}
