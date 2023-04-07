/**
 * MainLayout.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAppLoading } from 'containers/App/selectors';
import App from 'containers/App';
import Emitter from 'utils/events';
import { userExists } from 'utils/Helper';
import { EMITTER_EVENTS } from 'utils/constants';
import { LAYOUT_CONFIG } from '../constants';
import { StyledMainLayout } from './StyledMainLayout';
import Layouts from './Layout';

function MainLayout(props) {
  const { appLoading, defaultLayout, location } = props;
  const [collapsed, setCollapsed] = useState(true);
  const [layoutVariant, setLayoutVariant] = useState(defaultLayout);

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    const layoutVariantFromUrl = urlParams.get('layout')
      ? +urlParams.get('layout')
      : defaultLayout;
    setLayoutVariant(layoutVariantFromUrl);
    setCollapsed(
      ![LAYOUT_CONFIG.VERTICAL_OPTION_2].includes(layoutVariantFromUrl),
    );
  }, [defaultLayout, location]);

  useEffect(() => {
    function handleLogIn() {
      forceUpdate();
    }
    function handleLogOut() {
      forceUpdate();
    }

    Emitter.on(EMITTER_EVENTS.LOG_IN, handleLogIn);
    Emitter.on(EMITTER_EVENTS.LOG_OUT, handleLogOut);

    return () => {
      Emitter.off(EMITTER_EVENTS.LOG_IN, handleLogIn);
      Emitter.off(EMITTER_EVENTS.LOG_OUT, handleLogOut);
    };
  }, []);

  function forceUpdate() {
    // This is to force a re-render of the component
    setCollapsed(collapsed);
  }

  if (userExists()) {
    return (
      <Spin spinning={appLoading} size="default">
        <StyledMainLayout
          data-environment={
            process.env.NODE_ENV !== 'production' ? process.env.NODE_ENV : null
          }
          className="main-layout"
        >
          <Layouts
            collapsed={collapsed}
            layoutVariant={layoutVariant}
            toggle={() => setCollapsed(!collapsed)}
          />
        </StyledMainLayout>
      </Spin>
    );
  }
  console.log(props);
  return <App />;
}

MainLayout.propTypes = {
  appLoading: PropTypes.bool,
  location: PropTypes.object,
  defaultLayout: PropTypes.number,
};

MainLayout.defaultProps = {
  defaultLayout: 1,
};

const mapStateToProps = createStructuredSelector({
  appLoading: makeSelectAppLoading(),
});

export default connect(mapStateToProps)(MainLayout);
