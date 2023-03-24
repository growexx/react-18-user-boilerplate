/**
 * MainLayout.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectAppLoading } from 'containers/App/selectors';
import App from 'containers/App';
import Emitter from 'utils/events';
import { userExists } from 'utils/Helper';
import { EMITTER_EVENTS } from 'utils/constants';
import { LAYOUT_CONFIG } from '../constants';
import { StyledMainLayout } from './StyledMainLayout';
import Layouts from './Layout';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(props.location.search);
    const layoutVariant = urlParams.get('layout')
      ? +urlParams.get('layout')
      : props.defaultLayout;
    this.state = {
      collapsed: ![LAYOUT_CONFIG.VERTICAL_OPTION_2].includes(layoutVariant),
      layoutVariant,
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  componentDidMount() {
    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {
      this.forceUpdate();
    });
    Emitter.on(EMITTER_EVENTS.LOG_OUT, () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    Emitter.off(EMITTER_EVENTS.LOG_IN);
    Emitter.off(EMITTER_EVENTS.LOG_OUT);
  }

  render() {
    const { appLoading } = this.props;
    const { layoutVariant, collapsed } = this.state;

    if (userExists()) {
      return (
        <Spin spinning={appLoading} size="default">
          <StyledMainLayout
            data-environment={
              process.env.NODE_ENV !== 'production'
                ? process.env.NODE_ENV
                : null
            }
            className="main-layout"
          >
            <Layouts
              collapsed={collapsed}
              layoutVariant={layoutVariant}
              toggle={this.toggle}
            />
          </StyledMainLayout>
        </Spin>
      );
    }

    return <App />;
  }
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

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(withRouter(MainLayout));
