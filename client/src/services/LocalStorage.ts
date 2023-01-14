export class LocalStorage {
	static get = (key: string) => {
		try {
			const item = localStorage.getItem(key);
			if (!item) return null;
			return JSON.parse(item);
		} catch (error) {
			return null;
		}
	};

	static set = <T>(key: string, value: T) => {
		try {
			const stringifiedValue = JSON.stringify(value);
			localStorage.setItem(key, stringifiedValue);
		} catch (error) {
			return null;
		}
	};
}
