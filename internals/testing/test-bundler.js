// needed for regenerator-runtime
import 'core-js/stable';

// utility for styled-components. It makes classnames static so that they do not update everytime we make a change
import 'jest-styled-components';
// env file to be accessible by tests.
require('dotenv').config();

// matchMedia mock by jest
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
