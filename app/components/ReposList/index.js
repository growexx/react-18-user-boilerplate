import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

function ErrorComponent() {
  return <ListItem item="Something went wrong, please try again!" />;
}

function ReposList({ loading, error, repos }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    return <List component={ErrorComponent} />;
  }

  if (repos !== false) {
    return <List items={repos} component={RepoListItem} />;
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any,
};

export default ReposList;
