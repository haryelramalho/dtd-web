// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Supress Antd's async-validator warnings to be logged on test enviroment
const filteredWarnMessages: string[] = [
  'async-validator:',
];
const privateWarnLog = console.warn;
jest
  .spyOn(console, 'warn')
  .mockImplementation((msg: string, ...args: unknown[]) => {
    filteredWarnMessages.some((message) => msg.includes(message))
      ? jest.fn()
      : privateWarnLog(msg, ...args);
  });
