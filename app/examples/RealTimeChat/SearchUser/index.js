/**
 *
 * SearchUser
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Select } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { isEqual } from 'lodash';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import injectReducer from 'utils/injectReducer';
import { getUserData } from 'utils/Helper';
import { getFireStoreCollectionReference } from 'utils/firebase';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import reducer from 'examples/RealTimeChat/reducer';
import { REDUCER_KEY } from 'examples/RealTimeChat/constants';
import { updateField } from 'examples/RealTimeChat/actions';
import { resetChatWindow } from 'examples/RealTimeChat/helper';
import { TEST_IDS } from 'examples/RealTimeChat/stub';

export class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedUsers: [],
    };
  }

  onChange = value => {
    this.setState({
      selectedUsers: value,
    });
  };

  onCreate = async () => {
    const {
      updateAction,
      storeData: { currentUserRef, selectedChatWindow },
    } = this.props;
    const { selectedUsers } = this.state;
    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    const chatParticipantsGroup = {};
    selectedUsers.forEach(user => {
      chatParticipantsGroup[user] = true;
    });
    const newWindowParticipants = {
      [currentUserRef.id]: true,
      ...chatParticipantsGroup,
    };
    if (
      !isChatWindowOpen ||
      !isEqual(selectedChatWindow, newWindowParticipants)
    ) {
      resetChatWindow(updateAction);
      updateAction('selectedChatWindow', newWindowParticipants);
    }
  };

  async componentDidMount() {
    const { updateAction } = this.props;
    this.setState({
      loading: true,
    });
    // get users for search
    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
      .where('email', '!=', getUserData().email)
      .get()
      .then(querySnapshot => {
        const result = [];
        querySnapshot.forEach(doc => {
          result.push({ value: doc.id, label: doc.data().userName });
        });
        updateAction('searchResults', result);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        this.setState({
          loading: false,
        });
      });
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      storeData: { searchResults },
    } = this.props;
    const { loading, selectedUsers } = this.state;
    if (loading) {
      return <></>;
    }
    return (
      <div className="searchContainer">
        <Select
          allowClear
          maxTagCount={1}
          onChange={this.onChange}
          options={searchResults}
          placeholder="Search Users"
          mode="multiple"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <Button
          type="primary"
          onClick={this.onCreate}
          data-testid={TEST_IDS.CREATE_CHAT}
          disabled={selectedUsers.length === 0}
        >
          Create
        </Button>
      </div>
    );
  }
}

SearchUser.propTypes = {
  storeData: PropTypes.object,
  updateAction: PropTypes.func,
};

const withReducer = injectReducer({ key: REDUCER_KEY, reducer });

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectRealTimeChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateAction: (fieldName, fieldValue) => {
      dispatch(updateField(fieldName, fieldValue));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  memo,
)(SearchUser);
