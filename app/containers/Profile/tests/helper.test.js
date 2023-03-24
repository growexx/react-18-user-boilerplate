import { options } from '../helper';

describe('helper file for profile', () => {
  it('Should return options', () => {
    const optionsForDraftToHTML = options;

    // inlineStyleFn with true color

    optionsForDraftToHTML.inlineStyleFn({
      filter: jest.fn(() => ({
        first: jest.fn().mockReturnValue({
          replace: jest.fn(),
        }),
      })),
    });

    // inlineStyleFn with no color

    optionsForDraftToHTML.inlineStyleFn({
      filter: jest.fn(() => ({
        first: jest.fn().mockReturnValue(false),
      })),
    });

    // blockStyleFn with true

    optionsForDraftToHTML.blockStyleFn({
      getData: jest.fn(() => ({
        get: jest.fn().mockReturnValue(true),
      })),
    });

    // blockStyleFn with false

    optionsForDraftToHTML.blockStyleFn({
      getData: jest.fn(() => ({
        get: jest.fn().mockReturnValue(false),
      })),
    });

    expect(options).toBeTruthy();
  });
});
