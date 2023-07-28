import makeSelectSampleForm, { selectSampleFormDomain } from '../selectors';

describe('selectSampleFormDomain', () => {
  it('should select the sampleForm state', () => {
    const sampleFormState = {
      sampleForm: {},
    };
    expect(selectSampleFormDomain(sampleFormState)).toEqual(
      sampleFormState.sampleForm,
    );
  });
});

describe('makeSelectSampleForm', () => {
  const sampleFormSelector = makeSelectSampleForm();
  it('should select the sampleForm', () => {
    const sampleFormState = {};
    const mockedState = {
      sampleForm: sampleFormState,
    };
    expect(sampleFormSelector(mockedState)).toEqual(sampleFormState);
  });
});
