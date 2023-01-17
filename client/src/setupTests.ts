import "@testing-library/jest-dom";

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
} as unknown;

declare global {
	namespace globalThis {
		var IS_REACT_ACT_ENVIRONMENT: boolean;
	}
}

global.localStorage = localStorageMock as Storage;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
