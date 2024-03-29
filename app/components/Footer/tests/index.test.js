import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from 'configureStore';
import Footer from '../index';

describe('<Footer />', () => {
  let globalStore;

  beforeAll(() => {
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={globalStore}>
          <IntlProvider locale="en">
            <Footer />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
