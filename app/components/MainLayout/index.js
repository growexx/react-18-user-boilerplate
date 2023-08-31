import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
  const appLoading = useSelector(state => state.app.appLoading);
  const urlParams = new URLSearchParams(props.location.search);
  const [collapsed, setCollapsed] = useState(
    ![LAYOUT_CONFIG.VERTICAL_OPTION_2].includes(layoutVariant),
  );
  const [layoutVariant, setLayoutVariant] = useState(props.defaultLayout);

  useEffect(() => {
    const variant = urlParams.get('layout')
      ? +urlParams.get('layout')
      : props.defaultLayout;
    setLayoutVariant(variant);

    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {});
    Emitter.on(EMITTER_EVENTS.LOG_OUT, () => {
      setCollapsed();
      setLayoutVariant();
    });

    return () => {
      Emitter.off(EMITTER_EVENTS.LOG_IN);
      Emitter.off(EMITTER_EVENTS.LOG_OUT);
    };
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

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
            toggle={toggle}
          />
        </StyledMainLayout>
      </Spin>
    );
  }

  return <App />;
}

MainLayout.propTypes = {
  defaultLayout: PropTypes.number,
  location: PropTypes.object,
};

MainLayout.defaultProps = {
  defaultLayout: 1,
};

const mapStateToProps = createStructuredSelector({
  appLoading: makeSelectAppLoading(),
});

const withConnect = connect(mapStateToProps);

const MainLayoutWithConnect = withConnect(MainLayout);

function MainLayoutWrapper() {
  const location = useLocation();

  return <MainLayoutWithConnect location={location} />;
}

export default MainLayoutWrapper;
