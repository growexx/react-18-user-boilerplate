import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import App from 'containers/App';
import Emitter from 'utils/events';
import { userExists } from 'utils/Helper';
import { EMITTER_EVENTS } from 'utils/constants';
import { useSelector, shallowEqual } from 'react-redux';
import { selectGlobal } from 'containers/App/selectors';
import { LAYOUT_CONFIG } from '../constants';
import { StyledMainLayout } from './StyledMainLayout';
import Layouts from './Layout';

const MainLayout = props => {
  const globalState = useSelector(state => selectGlobal(state), shallowEqual);
  const [state, setState] = React.useState({
    collapsed: true,
  });
  // constructor(props) {
  //   super(props);
  //   const urlParams = new URLSearchParams(props.location.search);
  //   const layoutVariant = urlParams.get('layout')
  //     ? +urlParams.get('layout')
  //     : props.defaultLayout;
  //   this.state = {
  //     collapsed: ![LAYOUT_CONFIG.VERTICAL_OPTION_2].includes(layoutVariant),
  //     layoutVariant,
  //   };
  // }

  const toggle = () => {
    const { collapsed } = state;
    setState({
      collapsed: !collapsed,
    });
  };

  React.useEffect(() => {
    Emitter.on(EMITTER_EVENTS.LOG_IN, () => {
      const urlParams = new URLSearchParams(window.location.search);
      const layoutVariant = urlParams.get('layout')
        ? +urlParams.get('layout')
        : props.defaultLayout;
      setState({
        collapsed: ![LAYOUT_CONFIG.VERTICAL_OPTION_2].includes(layoutVariant),
        layoutVariant,
      });
    });

    return () => {
      Emitter.off(EMITTER_EVENTS.LOG_IN);
    };
  }, []);

  if (userExists()) {
    return (
      <Spin spinning={globalState.appLoading} size="default">
        <StyledMainLayout
          data-environment={
            process.env.NODE_ENV !== 'production' ? process.env.NODE_ENV : null
          }
          className="main-layout"
        >
          <Layouts
            collapsed={state.collapsed}
            layoutVariant={state.layoutVariant}
            toggle={toggle}
          />
        </StyledMainLayout>
      </Spin>
    );
  }

  return <App />;
};

MainLayout.propTypes = {
  defaultLayout: PropTypes.any,
};

export default MainLayout;
